import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../serices/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:any=[]
constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit() {
    this.api.getCart().subscribe({
      next:(res:any)=>{
        this.cart=res
        console.log(this.cart);
        
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
  removeFromCart(id:any){
    if (sessionStorage.getItem('token')) {
      
      this.api.removeFromWishCart(id).subscribe({
        next:(res:any)=>{
        
          
          this.toastr.success("product removed from cart")
          this.ngOnInit()
          this.api.cartCount()
        },
        error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })
    } else {
      this.toastr.warning("please login first")
    }
  }
}
