import { Component } from '@angular/core';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../model/category';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { ProductClass } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [DemoAngularMaterial,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent {

  editproductForm: FormGroup;
  listOfCategories:Category[]=[];
  products:ProductClass=new ProductClass();
  selectedFile: File | null = null;
  imagePreview!:string | ArrayBuffer |null 
  productId!:number

  constructor(private fb: FormBuilder, private productService: AuthService,private router:Router,private active:ActivatedRoute,private snackbar:MatSnackBar) {
    this.editproductForm = this.fb.group({
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
    this.productId=this.active.snapshot.params['productId'];
    console.log(this.productId);
    this.getProductDetail();
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onEdit() {
    if (this.editproductForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('productName', this.editproductForm.get('productName')?.value);
      formData.append('productDescription', this.editproductForm.get('productDescription')?.value);
      formData.append('productPrice', this.editproductForm.get('productPrice')?.value);
      formData.append('productQuantity', this.editproductForm.get('productQuantity')?.value);
      formData.append('productDiscount', this.editproductForm.get('productDiscount')?.value);
      formData.append('productPhoto', this.selectedFile);
      formData.append('categoryId',this.editproductForm.get('categoryId')?.value);

      this.productService.updateProductDetails(this.productId,formData).subscribe(response => {
        this.snackbar.open('Product Details Updated Successfully','Close',{duration:5000});
        this.router.navigate(['/admin/dashboard']);
      },error=>{alert('Sorry Product not saved')});
    }
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe(res=>{
      this.listOfCategories=res;
    })
  }

  getProductDetail(){
    this.productService.getProductDetailsById(this.productId).subscribe(res=>{
      this.products=res;
    },error=>{console.log("not fetching data")})
  }

}
