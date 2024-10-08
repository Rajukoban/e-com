import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Category } from '../../model/category';
import { DemoAngularMaterial } from '../../DemoAngularMaterial';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category1 } from '../../model/category1';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-category',
  standalone: true,
  imports: [DemoAngularMaterial,MatPaginator],
  templateUrl: './show-category.component.html',
  styleUrl: './show-category.component.css'
})
export class ShowCategoryComponent {

  category:Category[]=[];
  displayedColumns: string[] = ['categoryId','categoryName','categoryDescription','actions'];
  dataSource=new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator!:MatPaginator 
  @ViewChild(MatSort) sort!:MatSort

  constructor(private categoryService:AuthService,private router:Router,private snackbar:MatSnackBar){}

  ngOnInit(){
    this.loadCategories();
  }

  loadCategories():void{
    this.categoryService.getAllCategories().subscribe((data:Category[])=>{
      this.dataSource.data=data;
      this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort
    }) 
  }

  applyFilter(event:Event):void{
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(categoryId:number){
    this.router.navigate(['admin/category/update',categoryId]);
  }
  deleteCategory(categoryId:number){
    if(confirm("Are you sure want to delete this category")){
      this.categoryService.deleteCategoryById(categoryId).subscribe(res=>{
        this.snackbar.open('Category Deleted Successfully','Close',{duration:5000});
        this.router.navigate(['admin/dashborad']);
      },error=>{this.snackbar.open('category not deleted','Close',{duration:5000})})
    }
  }

} 
