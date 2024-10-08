import { Component, OnInit } from '@angular/core';
import { Images } from '../../models/images';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/product';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/UserStorageservice/storage.service';

@Component({
  selector: 'app-dashaboard',
  standalone: true,
  imports: [DemoAngularMaterial,CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './dashaboard.component.html',
  styleUrl: './dashaboard.component.css'
})
export class DashaboardComponent implements OnInit {

  products:any[]=[];

  constructor(private productService:AuthService,private router:Router,private snackbar:MatSnackBar,private route:Router){}

  ngOnInit(){
    this.productService.getAllProducts().subscribe((data:any[])=>{
      this.products=data;
    },error=>{
      alert("Product Server is busy");
    })
  }

  displayProduct(productId:number){
    console.log(productId);
    this.router.navigate(['users/display/productDetails',productId]);
  }

  addItems(productId:number){
    const userId=Number(StorageService.getUserId());
    if(userId!=0){
    this.productService.addToCart(productId).subscribe(res=>{
      this.snackbar.open('Product Added to Cart','Close',{duration:5000})
    },error=>{
      console.log("Sorry");
    })
  }else{
    this.route.navigate(['login']);
  }
  }

}
