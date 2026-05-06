import { Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from '../service/crud';
import { environment } from '../../../assets/environment';
import { MessageService } from 'primeng/api';

@Directive()
export abstract class AbstractAddUpdate<T>  {
  id:any;
  dataList:Array<any>=[];
  data:any={};
  isUpdate:boolean=false;
  isLocalStorage: boolean = environment.ISLOCALSTORAGE;
  moduleName:string='';
  protected crudSrv = inject(Crud);


  constructor(
    protected route:Router,
    protected activeRoute:ActivatedRoute,
    protected msgSrv:MessageService
  ) { }

  abstract getLSListName():string ;
  abstract getData():Object;
  abstract setData({}):any;

  //get data
  init(){
    this.id=this.activeRoute.snapshot.paramMap.get('id');
    if(this.isLocalStorage){
      // ===> LS
      if(this.getLSListName()){
        this.dataList= this.getItem(this.getLSListName());
      }
      else{
        this.dataList=[];
      }
      
      //set data
      if(this.id){
        this.isUpdate=true;
        this.data=this.dataList.find(item => item.id == this.id);
      }
      else{
        this.data={};
      }
    
    }
    else{
      if(this.id){
         this.isUpdate=true;
         this.crudSrv.getData(this.moduleName,this.id).subscribe({
          next:(res:any)=>{
            this.data=res;
            this.setData(this.data);
          }
        })
      }
     
    }
    
  }

  onSubmitData(){ 
    if(this.isLocalStorage){
      if(this.isUpdate){
        this.dataList=this.getItem(this.getLSListName());
        this.dataList= this.dataList.map((item)=>{
          if(item.id==this.data.id){
            item=this.data;
          }
          return item;
        })
        console.log("data ",this.data)
        console.log("data ",this.data)
        this.msgSrv.add({ severity:"success",summary:"Success",detail:"Updated Successfully" });

      }
      else{
        this.data=this.getData();
        this.dataList=this.getItem(this.getLSListName());
        if(this.dataList.length==0){
          this.data.id=this.dataList.length+1;
        }
        else{
          this.data.id=this.dataList.length+1;
        }
        this.dataList.push(this.data);
        this.msgSrv.add({ severity:"success",summary:"Success",detail:"Saved Successfully" })

      }
      this.setItem(this.getLSListName(),this.dataList);
    }
    else{
      if(this.isUpdate){
        this.crudSrv.update(this.moduleName,this.getData()).subscribe({
          next:(res:any)=>{
            this.msgSrv.add({ severity:"success",summary:"Success",detail:"Updated Successfully" });

          }
        })
      }
      else{
        this.crudSrv.create(this.moduleName,this.getData()).subscribe({
          next:(res:any)=>{
            console.log("Saved successfully ",res);
            this.msgSrv.add({ severity:"success",summary:"Success",detail:"Saved Successfully" })

          }
        })
      }


      
    }

  }


  getItem(key:string){
    const value:any=localStorage.getItem(key);
    return JSON.parse(value);
  }

  setItem(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));
  }

}
