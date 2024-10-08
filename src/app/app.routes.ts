import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashaboardComponent } from './user-components/dashaboard/dashaboard.component';
import { AddCategoryComponent } from './admin-components/add-category/add-category.component';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { ShowCategoryComponent } from './admin-components/show-category/show-category.component';
import { AdminDashboardComponent } from './admin-components/admin-dashboard/admin-dashboard.component';
import { EditProductsComponent } from './admin-components/edit-products/edit-products.component';
import { UpdateCategoryDetailsComponent } from './admin-components/update-category-details/update-category-details.component';
import { DisplayProductDetailsComponent } from './user-components/display-product-details/display-product-details.component';
import { CartComponent } from './user-components/cart/cart.component';
import { PostCouponComponent } from './admin-components/post-coupon/post-coupon.component';
import { GetCouponsComponent } from './admin-components/get-coupons/get-coupons.component';
import { OrdersComponent } from './admin-components/orders/orders.component';
import { MyOrdersComponent } from './user-components/my-orders/my-orders.component';
import { PostProductFAQComponent } from './admin-components/post-product-faq/post-product-faq.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'',component:DashaboardComponent},
  {path:'signup',component:SignupComponent},
  //Admin Routers
  {path:'admin/dashboard',component:AdminDashboardComponent},
  {path:'admin/addcategory',component:AddCategoryComponent},
  {path:'admin/addproduct',component:AddProductComponent},
  {path:'admin/show',component:ShowCategoryComponent},
  {path:'admin/update/:productId',component:EditProductsComponent}, 
  {path:'admin/category/update/:categoryId',component:UpdateCategoryDetailsComponent},
  {path:'admin/postCoupon',component:PostCouponComponent},
  {path:'admin/getCoupons',component:GetCouponsComponent},
  {path:'admin/orders',component:OrdersComponent},
  {path:'admin/faq/:productId',component:PostProductFAQComponent},

  //Customer Routers
  {path:'users/dashboard',component:DashaboardComponent},
  {path:'users/display/productDetails/:productId',component:DisplayProductDetailsComponent},
  {path:'users/cart',component:CartComponent},
  {path:'users/myOrders',component:MyOrdersComponent}

];
