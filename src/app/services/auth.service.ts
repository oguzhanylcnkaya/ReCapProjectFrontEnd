import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44306/api/auth/";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{

    let newApiUrl = this.apiUrl + "login";

    return this.httpClient.post<SingleResponseModel<TokenModel>>(newApiUrl, loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{

    let newApiUrl = this.apiUrl + "register";

    return this.httpClient.post<SingleResponseModel<TokenModel>>(newApiUrl, registerModel);
  }
}
