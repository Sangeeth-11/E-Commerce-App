import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../serices/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {
  regForm = this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z0-9]*')]],
    password:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.email]]
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router,private toastr:ToastrService){}
  handleSubmit(){
    console.log(this.regForm.value);
    this.api.regUser(this.regForm.value).subscribe({
      next:(res:any)=>{
        this.toastr.success("User Registration successfull")
        this.regForm.reset()
        this.router.navigateByUrl('log')
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }
}
