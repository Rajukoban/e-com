import { Category } from "./category"

export interface Product{
    productId:number
    productName:string
    productDescription:string
    productPhoto:string
    productPrice:number
    productDiscount:number
    productQuantity:number
    categoryId:number
    
}