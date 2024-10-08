import { Injectable } from '@angular/core';

const TOKEN="ticketproject-tocket";
const USER='ticketproject-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  public saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken():any{
    return localStorage.getItem(TOKEN);   //old line today
   //return window.localStorage.getItem(TOKEN);  //new Line added today
  }

  static getUser():any{
      if(typeof window !=='undefined'){
        const userdata =localStorage.getItem(USER);
        if(userdata!=null){
          return JSON.parse(userdata);
        }
      }
      return "";
  }

  static getUserId():string{
    const user=this.getUser();
    if(user==null){
      return '';
    }
    return user.userId;
  }

  static getUserRole():string{
    const user=this.getUser();
    if(user==null){
      return '';
    }
    return user.role;
  }

  static isAdmin():boolean{
    if(this.getToken==null){
      return false;
    }
    const role:string=this.getUserRole();
    return role=='ADMIN';
  }

  static isCustomerLoggedIN():boolean{
    if(this.getToken==null){
      return false;
    }
    const role:string=this.getUserRole();
    return role=='CUSTOMER';
  }
  static signOut():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
