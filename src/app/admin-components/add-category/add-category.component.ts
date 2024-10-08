import { Component } from '@angular/core';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../model/category';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  categoryForm!:FormGroup;
  constructor(private fb:FormBuilder,private snackbar:MatSnackBar,private categoryService:AuthService,private router:Router){}

  ngOnInit(){
    this.categoryForm=this.fb.group({
      categoryName:['',Validators.required],
      categoryDescription:['',Validators.required]
    })
  }

  onSubmit(){
    if(this.categoryForm.valid){
      this.categoryService.saveCategoryDetails(this.categoryForm.value).subscribe(
        (response) => {
          this.snackbar.open("Category Added Successfull",'Close',{duration:5000});
          this.router.navigateByUrl('/admin/dashboard');
        },
        (error) => {
          this.snackbar.open("Category not Added",'Close',{duration:5000});
        }
      );
    }
  }

}
