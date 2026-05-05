import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {  TableModule } from 'primeng/table';
import { Crud } from '../service/crud';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../assets/environment';
@Component({
  selector: 'app-table',
  imports: [ TableModule , CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Table implements OnInit {
  @Input() title:string='';
  @Input() dataList:Array<any>=[];
  @Input() columnList:Array<any>=[];
  @Input() rowsPerPage:Array<any>=[10, 25, 50];
  @Input() rows:number=10;
  @Input() getLSListName:string='';
  @Input() isLocalStorage:boolean=environment.ISLOCALSTORAGE;
  @Input() moduleName='';

  constructor(
    private crudSrv:Crud,
    private cdr: ChangeDetectorRef
  ){

  }
  

  ngOnInit(): void {
    // Using LocalStorage
    if(this.isLocalStorage){
      this.dataList=this.getItem(this.getLSListName);
      if(this.dataList==undefined){
        this.dataList=[];
        this.setItem(this.getLSListName,this.dataList);
      }
    }
    else{
      this.crudSrv.getList(this.moduleName).subscribe({
        next:(res:any)=>{
          console.log("res",res)
          this.dataList=res;
          this.cdr.detectChanges();   
          console.log("dat List ",this.dataList)
        },
        error:(erro:HttpErrorResponse)=>{
          throw new Error(erro.message);
        },
        complete: () => {
          console.log('Stream completed');
        }

      })
    }
    
  }

   getItem(key:string){
    const value:any=localStorage.getItem(key);
    return JSON.parse(value);
  }

  setItem(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));
  }

  
  onDelete(data:any){
    this.crudSrv.delete(this.moduleName,data.id).subscribe((res:any)=>{
      console.log("Successfully Delete this record")
      this.ngOnInit();
    })
  }
}
