import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';
import { Category1 } from '../../model/category1';

@Component({
  selector: 'app-update-category-details',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-category-details.component.html',
  styleUrl: './update-category-details.component.css'
})
export class UpdateCategoryDetailsComponent {
  categoryForm!:FormGroup;
  categoryId!:number;
  categories:Category1=new Category1();

  constructor(private fb:FormBuilder,private snackbar:MatSnackBar,private categoryService:AuthService,private router:Router,private active:ActivatedRoute){}

  ngOnInit(){
    this.categoryForm=this.fb.group({
      categoryName:['',Validators.required],
      categoryDescription:['',Validators.required]
    })
    this.categoryId=this.active.snapshot.params['categoryId'];
    this.loadCategoryById();
  }

  loadCategoryById(){
    this.categoryService.getCategoryById(this.categoryId).subscribe(res=>{
      this.categories=res;
    },error=>{console.log('not fetch category details')})
  }

  onSubmit(){
    if(this.categoryForm.valid){
      this.categoryService.updateCategoryDetails(this.categoryId,this.categoryForm.value).subscribe(
        (response) => {
          this.snackbar.open("Category Details Updated Successfull",'Close',{duration:5000});
          this.router.navigateByUrl('/admin/show');
        },
        (error) => {
          this.snackbar.open("Category not Added",'Close',{duration:5000});
        }
      );
    }
  }

}
