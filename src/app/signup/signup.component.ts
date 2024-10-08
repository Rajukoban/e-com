import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserRole } from '../models/role';
import { DemoAngularMaterial } from '../DemoAngularMaterial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DemoAngularMaterial,ReactiveFormsModule,RouterLink,RouterOutlet,RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!:FormGroup;

  hidePassword=true;

  roles=Object.values(UserRole); 

  constructor(private fb:FormBuilder,private snackbar:MatSnackBar,private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.signupForm=this.fb.group({
        name:[null,Validators.required],
        email:[null,[Validators.required,Validators.email]],
        password:[null,Validators.required],
        confirmpassword:[null,Validators.required],
        role:[UserRole.Customer,Validators.required]
    });
  }

  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }

  onSubmit(){
    const password=this.signupForm.get('password')?.value;
    const confirmpassword=this.signupForm.get('confirmpassword')?.value;

    if(password!==confirmpassword){
      this.snackbar.open('password do not match','Close',{duration:5000,panelClass:'error-snackbar'});
      return;
    }

    // this.authService.register(this.signupForm.value).subscribe(resp=>{
    //     this.snackbar.open('sign up sucess','Close',{duration:5000});
    //     this.router.navigateByUrl("/login");
    //   },
    //   (error)=>{
    //     this.snackbar.open('sign up faild.please try agin','Close',{duration:5000,panelClass:'error-snackbar'});
    //     console.log(error);
    //   }
    // )

    this.authService.register1(this.signupForm.value).subscribe(res=>{
      this.snackbar.open('sign up sucess','Close',{duration:5000});
      this.router.navigateByUrl("/login");
    },
    error=>{
      this.snackbar.open('sign up faild.please try agin','close',{duration:5000,panelClass:'err-snackbar'});
    }
  )
  }

}
