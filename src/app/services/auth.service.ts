import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './UserStorageservice/storage.service';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { ProductClass } from '../models/product';
import { Category1 } from '../model/category1';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

 const BaseURL="http://localhost:8001/api/user/";

 const categoryURL="http://localhost:8003/api/categories/";

 const productURL="http://localhost:8002/api/products/";

 const orderCartURL="http://localhost:8005/api/cart/";

 const couponURL="http://localhost:8005/api/admin/coupons";

 const b="192.168.66.18:8001/api/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private storage:StorageService) { }

  //Ueser Authentication 
  register1(signupRequest:any):Observable<any>{
    return this.http.post(BaseURL+"sign-up1",signupRequest);
   // return this.http.post(b+"sign-up1",signupRequest);
   }
  
   login(username:string,password:string):any{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    const body={username,password};
    return this.http.post(BaseURL+"authenticate",body,{headers,observe:'response'}).pipe(
      map((res)=>{
        const token=res.headers.get('authorization')?.substring(7);
        const user=res.body;
        if(token && user){
          this.storage.saveToken(token);
          this.storage.saveUser(user);
          return true;
        }
        return false;
      })
    )
  }

  //Category purpose

  saveCategoryDetails(category:Category):Observable<Category>{
    return this.http.post<Category>(categoryURL+"create",category,{
      headers:this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
  getAllCategories():Observable<any>{
    return this.http.get(categoryURL+"all");
  }

  getCategoryById(categoryId:number):Observable<Category>{
    return this.http.get<Category>(categoryURL+`${categoryId}`);
  }

  deleteCategoryById(categoryId:number):Observable<any>{
    return this.http.delete(categoryURL+`${categoryId}`);
  }

  updateCategoryDetails(categoryId:number,category:Category1):Observable<Category1>{
    return this.http.put<Category1>(categoryURL+"update/"+`${categoryId}`,category);
  }

  //Product Purpose Services

  saveProductDetails(formData:FormData):Observable<any>{
    return this.http.post(productURL+"save",formData);
  }

  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>(productURL+"all");
  }

  getProductDetailsById(productId:number):Observable<ProductClass>{
    return this.http.get<ProductClass>(productURL+`${productId}`);
  }

  deleteProductId(productId:number):Observable<any>{
    return this.http.delete<any>(productURL+`${productId}`);
  }

  updateProductDetails(productId:number,formData:FormData):Observable<any>{
    return this.http.put(productURL+`${productId}`,formData);
  }

  //OrderCart Purpose

  addToCart(productId:any):Observable<any>{
    const cartDto={
      productId:productId,
      userId:StorageService.getUserId()
    }
    return this.http.post(orderCartURL+"create",cartDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  getCartByUserId():Observable<any>{
    const userId=Number(StorageService.getUserId());
    return this.http.get(orderCartURL+`cart/${userId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  placeOrder(orderDto:any):Observable<any>{
    orderDto.userId=StorageService.getUserId();
    return this.http.post(orderCartURL+`placeOrderDetails`,orderDto,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getOrdersByUserId():Observable<any>{
    const userId=StorageService.getUserId();
    return this.http.get(orderCartURL+`myOrders/${userId}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getPlacedOrders():Observable<any>{
    return this.http.get(`http://localhost:8005/api/admin/placedOrders`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  changeOrderStatus(orderId:number,status:string):Observable<any>{
    return this.http.get(`http://localhost:8005/api/admin/order/${orderId}/${status}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  postFAQ(productId:number,Faq:any):Observable<any>{
    return this.http.post(productURL+`faq/${productId}`,Faq,{
      headers:this.createAuthorizationHeader(),
    })
  }

  //Coupons operations

  addCounpon(couponDto:any):Observable<any>{
    return this.http.post(couponURL,couponDto,{
      headers:this.createAuthorizationHeader(),
    })
  }

  getCoupons():Observable<any>{
    return this.http.get(couponURL,{
      headers:this.createAuthorizationHeader(),
    })
  }

  applyCoupon(code:any):Observable<any>{
    const userId=StorageService.getUserId();
    return this.http.get(orderCartURL+`coupon/${userId}/${code}`,{
      headers:this.createAuthorizationHeader(),
    })
  }

  increaseProductQuantity(productId:any):Observable<any>{
    const cartDto={
      productId:productId,
      userId:StorageService.getUserId()
    }
    return this.http.post(orderCartURL+"addProductInCart",cartDto,{
      headers:this.createAuthorizationHeader(),
    })
  }

  decreaseProductQuantity(productId:any):Observable<any>{
    const cartDto={
      productId:productId,
      userId:StorageService.getUserId()
    }
    return this.http.post(orderCartURL+"decreaseProductQuantity",cartDto,{
      headers:this.createAuthorizationHeader(),
    })
  }


}
