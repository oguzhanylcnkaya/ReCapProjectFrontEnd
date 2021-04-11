import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44306/api/users/"
  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string){
    let newApiUrl = this.apiUrl + "getuserbyemail?email=" +email;

    return this.httpClient.get<SingleResponseModel<User>>(newApiUrl);
  }

  getUserById(id:number):Observable<SingleResponseModel<User>>{

    let newApiUrl = this.apiUrl + "get?id=" + id;

    return this.httpClient.get<SingleResponseModel<User>>(newApiUrl);
  }

  updateUser(user:User):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, user);
  }
}
