import { Component } from '@angular/core';
import { ProductClass } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-product-details',
  standalone: true,
  imports: [DemoAngularMaterial,CommonModule],
  templateUrl: './display-product-details.component.html',
  styleUrl: './display-product-details.component.css'
})
export class DisplayProductDetailsComponent {

  productId!:number;
  products:ProductClass=new ProductClass();
  constructor(private service:AuthService,private active:ActivatedRoute){}

  ngOnInit(){
    this.productId=this.active.snapshot.params['productId'];
    this.loadProductDetails();
  }

  loadProductDetails(){
    this.service.getProductDetailsById(this.productId).subscribe(res=>{
      this.products=res;
    },error=>{console.log('product details not display')})
  }

}
