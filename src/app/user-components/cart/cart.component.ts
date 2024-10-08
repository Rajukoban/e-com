import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';
import { defaultUrlMatcher, Router } from '@angular/router';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems:any[]=[];
  order:any;

  couponForm!:FormGroup;

  constructor(private service:AuthService,private snackbar:MatSnackBar,private fb:FormBuilder,private dialog:MatDialog,private router:Router){
  }

  ngOnInit(){
    this.couponForm=this.fb.group({
      code:[null,[Validators.required]]
    })
    this.getCart();
  }

  applyCoupon(){
    this.service.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res=>{
      this.snackbar.open("Coupon Applied Successfully",'Close',{duration:5000});
      this.getCart();
    },error=>{
      this.snackbar.open("COUPON IS NOT APPLIED",'Close',{duration:5000})
    }
  );
    
  }

  displayProduct(productId:number){
    console.log(productId);
    this.router.navigate(['users/display/productDetails',productId]);
  }

  getCart(){
    this.cartItems=[];
    this.service.getCartByUserId().subscribe(res=>{
      this.order=res;
      res.cartItems.forEach((element:any) => {
        console.log("re:",element.returnedImg);
        element.productImg=element.productImage;
        this.cartItems.push(element);
      });
    })
  }

  increaseQuantity(productId:any){
    this.service.increaseProductQuantity(productId).subscribe(res=>{
      this.snackbar.open('Product Quantity incresed','Close',{duration:5000});
      this.getCart();
    })
  }

  decreaseQuantity(productId:any){
    this.service.decreaseProductQuantity(productId).subscribe(res=>{
      this.snackbar.open('Product Quantity decreased','Close',{duration:5000});
      this.getCart();
    })
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }

}
