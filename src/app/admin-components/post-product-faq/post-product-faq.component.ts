import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-product-faq',
  standalone: true,
  imports: [DemoAngularMaterial,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.css'
})
export class PostProductFAQComponent {

  constructor(private fb:FormBuilder,private router:Router,private snackBar:MatSnackBar,private service:AuthService,private activeRoute:ActivatedRoute){}

  productId:number=this.activeRoute.snapshot.params["productId"];

  FAQForm!:FormGroup;

  ngOnInit(){
    this.FAQForm=this.fb.group({
      question:[null,[Validators.required]],
      answer:[null,[Validators.required]],
    })
  }

  postFAQ(){
    this.service.postFAQ(this.productId,this.FAQForm.value).subscribe(res=>{
      if(res.id!=null){
        this.snackBar.open('FAQ Posted Successfully','Close',{duration:5000});
        this.router.navigate(['/admin/dashboard']);
      }else{
        this.snackBar.open('Something went wrong in faq','Close',{duration:5000,panelClass:'error-snackbar'})
      }
    })
  }
}
