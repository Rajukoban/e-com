import { Component } from '@angular/core';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post-coupon',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './post-coupon.component.html',
  styleUrl: './post-coupon.component.css'
})
export class PostCouponComponent {

  couponForm!:FormGroup

  constructor(private fb:FormBuilder,private router:Router,private snackbar:MatSnackBar,private service:AuthService){}

  ngOnInit(){
    this.couponForm=this.fb.group({
      couponName:[null,[Validators.required]],
      couponCode:[null,[Validators.required]],
      discount:[null,[Validators.required]],
      expirationDate:[null,[Validators.required]]
    })
  }


  addCoupon(){
    if(this.couponForm.valid){
      this.service.addCounpon(this.couponForm.value).subscribe(res=>{
        if(res.couponId!=null){
          this.snackbar.open('Coupon Posted Successfully!','Close',{duration:5000});
          this.router.navigate(['/admin/dashboard']);
        }else{
          this.snackbar.open('soory','Close',{duration:5000,panelClass:'error-snackbar'});
        }
      })
    }else{
      this.couponForm.markAllAsTouched();
    }

  }

}
