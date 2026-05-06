import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../assets/environment';

@Injectable({
  providedIn: 'root',
})
export class Crud {

  constructor(private httpClient:HttpClient){

  }
  
  getList(moduleName:string){
    return this.httpClient.get(environment.url+moduleName);
  }
  create(moduleName:string,data:any){
    return this.httpClient.post(environment.url+moduleName,data);
  }
  update(moduleName:string,data:any){
    return this.httpClient.put(environment.url+moduleName+"/"+data.id,data);
  }
  getData(moduleName:string,id:any){
    return this.httpClient.get(environment.url+moduleName+"/"+id);
  }
  delete(moduleName:any,id:any){
    return this.httpClient.delete(environment.url+moduleName+"/"+id);
  }
}
