import { Component } from '@angular/core';
import { ApiService } from '../serices/api.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:any=[]
  constructor(private api:ApiService,private toastr:ToastrService){

  }
  ngOnInit() {
    this.api.getWishList().subscribe({
      next:(res:any)=>{
        this.wishlist=res
        console.log(this.wishlist);
        
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
  removeWishList(id:any){
    if (sessionStorage.getItem('token')) {
      
      this.api.removeFromWishList(id).subscribe({
        next:(res:any)=>{
        
          
          this.toastr.success("product removed from wishlist")
          this.ngOnInit()
          this.api.getWishListCount()
        },
        error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })
    } else {
      this.toastr.warning("please login first")
    }
  }
  addCart(data:any){
    const {_id,id,title,category,image,price}=data
    const quantity =1
    if (sessionStorage.getItem('token')) {
      
      this.api.addCart({id,title,category,image,price,quantity}).subscribe({
        next:(res:any)=>{
          this.toastr.success("Added to cart")
          this.api.getWishListCount()
          this.api.cartCount()
          this.removeWishList(_id)
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
