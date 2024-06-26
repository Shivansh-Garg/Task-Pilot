import { Injectable } from '@angular/core';
//import 'localstorage-polyfill';
//global['localStorage'] = localStorage;

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  static saveToken(token: string): void{
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN,token);
    console.log("token saved");
  }

  static saveUser(user: any): void{
    localStorage.removeItem(USER);
    localStorage.setItem(USER,JSON.stringify(user));
    console.log("user saved");
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  
  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER) || 'null');
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){
      return "";
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role :string = this.getUserRole();
    return role == "ADMIN";
  }

  static isEmployeeLoggedIn(): boolean{
    if(this.getToken() === null){
      return false;
    }
    const role :string = this.getUserRole();
    return role == "EMPLOYEE";
  }

  static getUserId(): string{
    const user = this.getUser();
      if(user == null){
        return "";
      }
      return user.id;
  }

  static logout(): void{
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
  }

}
