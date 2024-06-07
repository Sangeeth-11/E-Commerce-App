import { Component } from '@angular/core';
import { ApiService } from '../serices/api.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:any=[]
  constructor(private api:ApiService){}
  ngOnInit() {
    this.api.getAllProducts().subscribe({
      next:(res:any)=>{
        this.getData(res)
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  getData(data:any){
    this.products=data
  }
}
