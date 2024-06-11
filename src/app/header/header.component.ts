import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../serices/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  logStatus:any = false
  userName:any =''
  wishlistcnt:any=0
  cartcnt:any=0

  constructor(private api:ApiService){}
  ngOnInit() {
    
    if (sessionStorage.getItem('user')) {
      const us:any= sessionStorage.getItem('user') 
      this.userName = JSON.parse(us)?.username
      this.logStatus=true
      this.api.wishListCountBS.subscribe((res:any)=>{
        this.wishlistcnt = res
      })
      this.api.cartCountBS.subscribe((res:any)=>{
        this.cartcnt = res
      })
    } 
    else {
      this.logStatus=false
      this.userName =""
    }
  
  }

}
