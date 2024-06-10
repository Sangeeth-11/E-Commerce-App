import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  wishListCountBS = new BehaviorSubject(0)
  base_url :string="http://localhost:3000"
  constructor(private http:HttpClient) { 
    if (sessionStorage.getItem('token')) {
      this.getWishListCount()
    }
  }
  getAllProducts(){
    return this.http.get(`${this.base_url}/all-products`)
  }
  getProduct(id:any){
    return this.http.get(`${this.base_url}/get-product/${id}`)
  }
  regUser(data:any){
    return this.http.post(`${this.base_url}/register`,data)
  }
  logUser(data:any){
    return this.http.post(`${this.base_url}/login`,data)
  }

  appendTokenToHeader(){
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  addToWishList(data:any){
    return this.http.post(`${this.base_url}/addToWishList`,data,this.appendTokenToHeader())
  }
  getWishList(){
    return this.http.get(`${this.base_url}/getFromWishlist`,this.appendTokenToHeader())
  }
  removeFromWishList(id:any){
    return this.http.delete(`${this.base_url}/removeFromWishlist/${id}`,this.appendTokenToHeader())
  }

  getWishListCount(){
    this.getWishList().subscribe((res:any)=>{
      this.wishListCountBS.next(res.length)
    })
  }
}
