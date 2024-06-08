import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logStatus:any = false
  userName:any =''
  constructor(){
    if (sessionStorage.getItem('user')) {
      this.logStatus=true
      const us:any= sessionStorage.getItem('user') 
      this.userName = JSON.parse(us)?.username
    } else {
      this.logStatus=false
      this.userName =""
    }
  }

}
