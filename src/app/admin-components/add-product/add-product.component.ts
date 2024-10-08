import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [DemoAngularMaterial,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  productForm: FormGroup;
  listOfCategories:Category[]=[];
  selectedFile: File | null = null;
  imagePreview!:string | ArrayBuffer |null

  constructor(private fb: FormBuilder, private productService: AuthService,private router:Router) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productDiscount: ['', Validators.required],
      productPhoto: ['', Validators.required],
      categoryId: ['',Validators.required],
    });
  }

  ngOnInit(){
    this.getAllCategories();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('productDescription', this.productForm.get('productDescription')?.value);
      formData.append('productPrice', this.productForm.get('productPrice')?.value);
      formData.append('productQuantity', this.productForm.get('productQuantity')?.value);
      formData.append('productDiscount', this.productForm.get('productDiscount')?.value);
      formData.append('productPhoto', this.selectedFile);
      formData.append('categoryId',this.productForm.get('categoryId')?.value);

      this.productService.saveProductDetails(formData).subscribe(response => {
        this.router.navigate(['/admin/dashboard']);
      },error=>{alert('Sorry Product not saved')});
    }
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe(res=>{
      this.listOfCategories=res;
    })
  }

}
