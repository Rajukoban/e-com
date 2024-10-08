import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/UserStorageservice/storage.service';
import { DemoAngularMaterial } from './DemoAngularMaterial';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from './model/product';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,DemoAngularMaterial,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ticket-bot';

  @ViewChild(MatPaginator) paginator!:MatPaginator 
  @ViewChild(MatSort) sort!:MatSort
  dataSource=new MatTableDataSource<Product>();

  userId=parseInt(StorageService.getUserId());
  isAdminLoggedIn:boolean=StorageService.isAdmin();
  isCustomerLoggedIn:boolean=StorageService.isCustomerLoggedIN()

  constructor(private router:Router){}

  ngOnInit():void{
    this.router.events.subscribe(event=>{
      this.isAdminLoggedIn=StorageService.isAdmin();
      this.isCustomerLoggedIn=StorageService.isCustomerLoggedIN();
    })
  }

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('users/dashboard');
  }

  applyFilter(event:Event):void{
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
