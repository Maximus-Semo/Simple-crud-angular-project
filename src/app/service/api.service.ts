import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProdcut(data : any){
    return this.http.post<any>("http://localhost:3000/productList/",data)
  }
  
  getProdcut(){
    return this.http.get<any>("http://localhost:3000/productList/")
  }
  putProduct(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/productList/" + data, id )
  }

  deleteProudct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/" + id)
  }
}
