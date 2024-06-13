import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  wishListCountBS = new BehaviorSubject(0)
  cartCountBS = new BehaviorSubject(0)
  searchBS = new BehaviorSubject("")
  base_url: string = "http://localhost:3000"
  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('token')) {
      this.getWishListCount()
      this.cartCount()
    }
  }
  getAllProducts() {
    return this.http.get(`${this.base_url}/all-products`)
  }
  getProduct(id: any) {
    return this.http.get(`${this.base_url}/get-product/${id}`)
  }
  regUser(data: any) {
    return this.http.post(`${this.base_url}/register`, data)
  }
  logUser(data: any) {
    return this.http.post(`${this.base_url}/login`, data)
  }

  appendTokenToHeader() {
    const token = sessionStorage.getItem('token')
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }
  addToWishList(data: any) {
    return this.http.post(`${this.base_url}/addToWishList`, data, this.appendTokenToHeader())
  }
  getWishList() {
    return this.http.get(`${this.base_url}/getFromWishlist`, this.appendTokenToHeader())
  }
  removeFromWishList(id: any) {
    return this.http.delete(`${this.base_url}/removeFromWishlist/${id}`, this.appendTokenToHeader())
  }

  getWishListCount() {
    this.getWishList().subscribe((res: any) => {
      this.wishListCountBS.next(res.length)
    })
  }
  addCart(data: any) {
    return this.http.post(`${this.base_url}/addCart`, data, this.appendTokenToHeader())
  }
  getCart() {
    return this.http.get(`${this.base_url}/getCart`, this.appendTokenToHeader())
  }
  cartCount() {
    this.getCart().subscribe((res: any) => {
      this.cartCountBS.next(res.length)
      console.log(res.length);
      
    })
  }
  removeFromCart(id: any) {
    return this.http.delete(`${this.base_url}/removeCart/${id}`, this.appendTokenToHeader())
  }
  incrementCart(id: any) {
    return this.http.get(`${this.base_url}/cartInc/${id}`, this.appendTokenToHeader())
  }
  decrementCart(id: any) {
    return this.http.get(`${this.base_url}/cartDec/${id}`, this.appendTokenToHeader())
  }
  emptyCart() {
    return this.http.delete(`${this.base_url}/emptyCart`, this.appendTokenToHeader())
  }
  isLoggedIn(){
    return !!sessionStorage.getItem('token')
  }
}
