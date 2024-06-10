import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../serices/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  pid:any=""
  product:any={}
  constructor(private ar:ActivatedRoute,private api:ApiService,private toastr:ToastrService){
    this.ar.params.subscribe((res:any)=>{
      this.pid=res.id
    })
  }
  ngOnInit() {
    this.api.getProduct(this.pid).subscribe({
      next:(res:any)=>{
        this.product=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  addWishList(data:any){
    this.api.addToWishList(data).subscribe({
      next:(res:any)=>{
        this.toastr.success("Added to Wishlist")
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
}
