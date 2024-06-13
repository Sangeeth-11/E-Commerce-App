import { Component } from '@angular/core';
import { ApiService } from '../serices/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:any=[]
  key:any=""
  constructor(private api:ApiService,private toastr:ToastrService){}
  ngOnInit() {
    this.api.getAllProducts().subscribe({
      next:(res:any)=>{
        this.products=res
        this.api.searchBS.subscribe((res:any)=>{
          this.key=res
        })
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addWishList(data:any){
    if (sessionStorage.getItem('token')) {
      
      this.api.addToWishList(data).subscribe({
        next:(res:any)=>{
          this.toastr.success("Added to Wishlist")
          this.api.getWishListCount()
        },
        error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })
    } else {
      this.toastr.error("please login first")
    }
  }
  addCart(data:any){
    const {id,title,category,image,price}=data
    const quantity =1
    if (sessionStorage.getItem('token')) {
      
      this.api.addCart({id,title,category,image,price,quantity}).subscribe({
        next:(res:any)=>{
          this.toastr.success("Added to Wishlist")
          this.api.getWishListCount()
          this.api.cartCount()
        },
        error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })
    } else {
      this.toastr.error("please login first")
    }
  }
  
}
