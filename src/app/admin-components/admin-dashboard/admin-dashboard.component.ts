import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DemoAngularMaterial,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  products:any[]=[];

  constructor(private productService:AuthService,private snackbar:MatSnackBar,private router:Router){}

  ngOnInit(){
    this.productService.getAllProducts().subscribe((data:any[])=>{
      this.products=data;
    },error=>{
      alert("Products not found");
    })
  }
 
  edit(productId:number){
    this.router.navigate(['admin/update',productId]);
  }

  deleted(productId:number):any{
    if(confirm("Are you sure want to delete this product")){
    this.productService.deleteProductId(productId).subscribe(res=>{
      this.snackbar.open('Product Details Deleted Successfully','Close',{duration:5000});
      this.router.navigate(['/admin/dashborad']);
    },error=>{
      this.snackbar.open('Product Not Deleted','Close',{duration:5000})
    })
  }
  }

  faq(productId:number){
    this.router.navigate(['admin/faq',productId]);
  }

}
