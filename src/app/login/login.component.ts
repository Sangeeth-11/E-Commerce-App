import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../serices/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logForm = this.fb.group({
    password:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.email]]
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router,private toastr:ToastrService){}
  handleSubmit(){
    console.log(this.logForm.value);
    this.api.logUser(this.logForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        sessionStorage.setItem('user',JSON.stringify(res.existingUser))
        sessionStorage.setItem('token',res.token)
        this.toastr.success("Login successfull")
        this.logForm.reset()
        this.router.navigateByUrl('')
        this.api.getWishListCount()
        this.api.cartCount()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
}
