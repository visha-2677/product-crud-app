import { AfterViewInit, Component, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Table } from "../../core/table/table";
import { ButtonModule } from 'primeng/button';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { productModal } from '../modal/product.modal';
import { environment } from '../../../assets/environment';
import { MessageService } from 'primeng/api';

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
  @ViewChild(Table,{static:false}) private tableRef!:Table;
  moduleName="products";
  isLocalStorage:boolean=environment.ISLOCALSTORAGE;

  constructor(private route:Router,private msgSrv:MessageService) {
    
  }

  ngOnInit(): void {
    if(this.isLocalStorage){
      this.dataList=this.getItem('productList');
    }
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
    if(confirm("Are you sure delete this row")){
      if(this.isLocalStorage){
        console.log("data ",data.id);
        console.log("data  1",this.dataList);

        this.dataList= this.dataList.filter((item)=>item.id != data.id);
        console.log("data 2 ",this.dataList);
        

        this.setItem("productList",this.dataList)
        this.msgSrv.add({ severity:"success",summary:"Success",detail:"Successfully Deleted Records" });
      }
      else{
        this.tableRef.onDelete(data);
      }
    }
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
