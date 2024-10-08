import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [DemoAngularMaterial,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  orderForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private service:AuthService,
    private router:Router,
    private dialog:MatDialog
  ){}

  ngOnInit(){
    this.orderForm=this.fb.group({
      address:[null,[Validators.required]],
      orderDescription:[null],
    })
  }

  placeOrder(){
    this.service.placeOrder(this.orderForm.value).subscribe(res=>{
      if(res.id!=null){
        this.snackbar.open("Order placed successfully",'Close',{duration:5000});
        this.router.navigate(["/users/myOrders"]);
        this.closeForm();
      }else{
        this.snackbar.open("something went wrong",'Close',{duration:5000});
      }
    })
  }

  closeForm(){
    this.dialog.closeAll();
  }

}
