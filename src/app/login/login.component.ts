import { Component } from '@angular/core';
import { DemoAngularMaterial } from '../DemoAngularMaterial';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../services/UserStorageservice/storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!:FormGroup;

  hidePassword=true;

  constructor(private fb:FormBuilder,private authservice:AuthService,private snackbar:MatSnackBar,private router:Router){}

  ngOnInit(){
    this.loginForm=this.fb.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }

  onSubmit():any{
    const username=this.loginForm.get('email')!.value;
    const password=this.loginForm.get('password')!.value;
    this.authservice.login(username,password).subscribe((res: any)=>{
      if(StorageService.isAdmin()){
        this.router.navigate(['admin/dashboard']);
        this.snackbar.open('Login Success','Close',{duration:5000});
      }else if(StorageService.isCustomerLoggedIN()){
        this.router.navigateByUrl('users/dashboard');
        this.snackbar.open('Login Success','Close',{duration:5000})
      }
    },(error: any)=>{
      this.snackbar.open("Invalid username and password",'ERROR',{duration:5000});
    })
  }

}
