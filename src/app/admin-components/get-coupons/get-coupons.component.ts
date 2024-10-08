import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-coupons',
  standalone: true,
  imports: [DemoAngularMaterial,CommonModule],
  templateUrl: './get-coupons.component.html',
  styleUrl: './get-coupons.component.css'
})
export class GetCouponsComponent {

  coupons:any;

  constructor(private service:AuthService){}

  ngOnInit(){
    this.getCoupons();
  }

  getCoupons(){
    this.service.getCoupons().subscribe(res=>{
      this.coupons=res;
    })
  }

}
