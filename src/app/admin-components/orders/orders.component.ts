import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders:any;

  constructor(private adminService:AuthService,private snackbar:MatSnackBar){}

  ngOnInit(){
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res=>{
      this.orders=res;
    })
  }

  changeOrderStatus(orderId:number,status:string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
      if(res.id!=null){
        this.snackbar.open('Order Status changed successfully','Close',{duration:5000});
        this.getPlacedOrders();
      }
    },error=>{
    this.snackbar.open('not chenaged','Close',{duration:5000});
    })
  }

}
