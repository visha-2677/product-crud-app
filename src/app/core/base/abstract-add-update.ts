import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Directive()
export abstract class AbstractAddUpdate<T>  {
  id:any;
  dataList:Array<any>=[];
  data:any={};
  isUpdate:boolean=false;
  constructor(
    protected route:Router,
    protected activeRoute:ActivatedRoute
  ) { }

  abstract getLSListName():string ;
  abstract getData():Object;

  //get data
  init(){
    console.log("thisdata ",this.data)
    // ===> LS
    this.id=this.activeRoute.snapshot.paramMap.get('id');
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

  onSubmitData(){ 
    if(this.isUpdate){
      console.log("isUpdate")
      this.dataList=this.getItem(this.getLSListName());
      this.dataList= this.dataList.map((item)=>{
        if(item.id==this.data.id){
          item=this.data;
        }
        return item;
      })
      console.log("data ",this.data)
      console.log("data ",this.data)
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
    }
    this.setItem(this.getLSListName(),this.dataList);

  }


  getItem(key:string){
    const value:any=localStorage.getItem(key);
    return JSON.parse(value);
  }

  setItem(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));
  }

}
