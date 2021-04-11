import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(name:string, value:any){
    localStorage.setItem(name, value);
  }

  getItem(name:string){
    return localStorage.getItem(name);
  }

  deleteItem(name:string){
    localStorage.removeItem(name);
  }

  clearAll(){
    localStorage.clear();
  }

}
