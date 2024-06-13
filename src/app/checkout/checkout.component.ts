import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ApiService } from '../serices/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
   payPalConfig ? : IPayPalConfig;

  checkStatus:boolean=false
  total:string = ""

  checkForm = this.fb.group({
    first:['',[Validators.required,Validators.minLength(4)]],
    last:['',[Validators.required,Validators.minLength(1)]],
    address:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.minLength(4)]],
    phone:['',[Validators.required,Validators.minLength(10),Validators.pattern('[0-9]*')]],
    pincode:['',[Validators.required,Validators.minLength(6)]],
  })
  constructor(private fb:FormBuilder,private toastr:ToastrService,private api: ApiService, private router:Router){}

  proceedToPay(){
    if (this.checkForm.valid) {
      this.checkStatus = true
  this.total=sessionStorage.getItem('checkoutAmount') || ""
  this.initConfig()
    } else {
      this.toastr.info("invalid inputs")    
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.total,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.total
                        }
                    }
                },
                
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
            this.api.emptyCart().subscribe((res:any)=>{
              this.toastr.success("Transaction completed!! Purchased SuccessFully")
              this.checkForm.reset()
              this.api.cartCount()
              this.checkStatus=false
              sessionStorage.removeItem('checkoutAmount')
              this.router.navigateByUrl('/')
              })
              },
              onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.toastr.success("Transaction cancelled!! ")
                // this.showCancel = true;
                
                },
                onError: err => {
                  console.log('OnError', err);
                  this.toastr.success("Transaction failed!! ")
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}


}

