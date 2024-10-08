import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [DemoAngularMaterial,CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  myOrders:any;

  constructor(private service:AuthService){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.service.getOrdersByUserId().subscribe(res=>{
      this.myOrders=res;
    })
  }

}
