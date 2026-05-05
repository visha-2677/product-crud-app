import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Crud {

  constructor(private httpClient:HttpClient){

  }
  
  getList(moduleName:string){
    return this.httpClient.get("http://localhost:3000/"+moduleName);
  }
  create(moduleName:string,data:any){
    return this.httpClient.post("http://localhost:3000/"+moduleName,data);
  }
  update(moduleName:string,data:any){
    return this.httpClient.put("http://localhost:3000/"+moduleName+"/"+data.id,data);
  }
  getData(moduleName:string,id:any){
    return this.httpClient.get("http://localhost:3000/"+moduleName+"/"+id);
  }
  delete(moduleName:any,id:any){
    return this.httpClient.delete("http://localhost:3000/"+moduleName+"/"+id);
  }
}
