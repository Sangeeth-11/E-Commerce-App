import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb:FormBuilder){}
  handleSubmit(){
    console.log(this.regForm.value);
    
  }
}
