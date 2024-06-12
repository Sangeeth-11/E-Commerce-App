import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../serices/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = []
  cartTotal:any=0
  couponStatus :boolean =false
  couponuseStatus :boolean =false
  couponDiscount:any =0
  finalCartTotal:any =0
  constructor(private api: ApiService, private toastr: ToastrService,private router:Router) { }

  ngOnInit() {
    this.api.getCart().subscribe({
      next: (res: any) => {
        this.cart = res
        console.log(this.cart);
        this.getcartTotal()
        this.couponStatus=false
        this.couponuseStatus=false

      },
      error: (err: any) => {
        this.toastr.error(err.error)
      }
    })
  }
  removeFromCart(id: any) {
    if (sessionStorage.getItem('token')) {

      this.api.removeFromCart(id).subscribe({
        next: (res: any) => {


          this.toastr.success("product removed from cart")
          this.ngOnInit()
          this.api.cartCount()
          
         
        },
        error: (err: any) => {
          this.toastr.error(err.error)
        }
      })
    } else {
      this.toastr.warning("please login first")
    }
  }
  increment(id: any) {

    this.api.incrementCart(id).subscribe({
      next: (res: any) => {
        this.ngOnInit()
       

      },
      error: (err: any) => {
        // this.toastr.error(err.error)
        console.log(err.error);

      }
    })
  }
  decrement(id: any) {

    this.api.decrementCart(id).subscribe({
      next: (res: any) => {
        this.ngOnInit()
        this.api.cartCount()
       
      },
      error: (err: any) => {
        console.log(err.error);
        // this.toastr.error(err.error)
      }
    })
  }

  empty() {

    this.api.emptyCart().subscribe({
      next: (res: any) => {
        this.ngOnInit()
        this.api.cartCount()
        this.cartTotal=0
        this.finalCartTotal=0
      },
      error: (err: any) => {
        // this.toastr.error(err.error)
        console.log(err.error);

      }
    })
  }
  getcartTotal(){
   this.cartTotal=Math.ceil(this.cart?.map((item:any)=>item.totalPrice).reduce((prev:any,next:any)=>prev+next))
   this.finalCartTotal=this.cartTotal
  }
  changeCouponStatus(){
    this.couponStatus = true
  }
  discount5(){
    this.couponuseStatus=true
    this.couponDiscount=5
    const discount = Math.ceil(this.cartTotal*0.05)
    this.finalCartTotal-=discount
  }
  discount25(){
    this.couponuseStatus=true
    this.couponDiscount=25
    const discount = Math.ceil(this.cartTotal*0.25)
    this.finalCartTotal-=discount
  }
  discount50(){
    this.couponuseStatus=true
    this.couponDiscount=50
    const discount = Math.ceil(this.cartTotal*0.5)
    this.finalCartTotal-=discount
  }
  checkout(){
    sessionStorage.setItem('checkoutAmount',this.finalCartTotal)
    this.router.navigateByUrl('check')
  }
}
