import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  TableModule } from 'primeng/table';
@Component({
  selector: 'app-table',
  imports: [ TableModule , CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements OnInit {
  @Input() title:string='';
  @Input() dataList:Array<any>=[];
  @Input() columnList:Array<any>=[];
  @Input() rowsPerPage:Array<any>=[10, 25, 50];
  @Input() rows:number=10;
  @Input() getLSListName:string='';
  

  ngOnInit(): void {
    this.dataList=this.getItem(this.getLSListName);
    if(this.dataList==undefined){
      this.dataList=[];
      this.setItem(this.getLSListName,this.dataList);
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
