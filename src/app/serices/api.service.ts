import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url :string="http://localhost:3000"
  constructor(private http:HttpClient) { }
  getAllProducts(){
    return this.http.get(`${this.base_url}/all-products`)
  }
}
