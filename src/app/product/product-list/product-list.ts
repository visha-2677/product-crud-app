import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Table } from "../../core/table/table";
import { ButtonModule } from 'primeng/button';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { productModal } from '../modal/product.modal';

@Component({
  selector: 'app-product-list',
  imports: [Table,ButtonModule,CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit,AfterViewInit{
  title="Product List";
  dataList:Array<productModal>=[];
  columnList:Array<any>=[];
  @ViewChild('statusRef',{static:false}) statusRef!:TemplateRef<any>;
  @ViewChild('actionRef',{static:false}) actionRef!:TemplateRef<any>;

  constructor(private route:Router) {
    
  }

  ngOnInit(): void {
    this.dataList=this.getItem('productList');
    this.getColumnList();
  }

  ngAfterViewInit(): void {
      this.columnList.forEach((col)=>{
        if(col.field=="status"){
          col.customControls=[this.statusRef];
        }
        if(col.field=="action"){
          col.customControls=[this.actionRef];
        }
      })
  }

  getColumnList(){
    this.columnList=[
      {
        field:"serialNumber",
        header:"#"
      },
      {
        field:"name",
        header:"Name"
      },
      {
        field:"category",
        header:"Category"
      },
      {
        field:"currency",
        header:"Currency"
      },
      {
        field:"price",
        header:"Price"
      },
      {
        field:"status",
        customControls:[this.statusRef],
        header:"Status"
      },
      {
        field:"action",
        customControls:[this.actionRef],
        header:"Action"
      }
    ]
  }

  onAddClick(){
    this.route.navigate(['products/add-update']);
  }
  onDelete(data:productModal){
    
  }
  onEdit(data:productModal){
    this.route.navigate(['products/add-update',data.id])
  }

  getItem(key:string){
    const value:any=localStorage.getItem(key);
    return JSON.parse(value);
  }

  setItem(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));
  }

}
