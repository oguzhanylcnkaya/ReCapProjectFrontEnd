import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  apiUrl = "https://localhost:44306/api/userOperationClaims/";
  constructor(private httpClient:HttpClient) { }

  add(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(newApiUrl, userOperationClaim);
  }

  update(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, userOperationClaim);
  }

  delete(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "delete";

    return this.httpClient.post<ResponseModel>(newApiUrl, userOperationClaim);
  }

  getall():Observable<ListResponseModel<UserOperationClaim>>{
    let newApiUrl = this.apiUrl + "getall";

    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newApiUrl);
  }

  getById(id:number):Observable<SingleResponseModel<UserOperationClaim>>{
    let newApiUrl = this.apiUrl + "getbyid?id=" + id;

    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(newApiUrl);
  }

  getByUserId(userId:number):Observable<ListResponseModel<UserOperationClaim>>{
    let newApiUrl = this.apiUrl + "getbyuserid?userId="+userId;

    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newApiUrl);
  }

  getByOperationClaimId(operationClaimId:number):Observable<ListResponseModel<UserOperationClaim>>{
    let newApiUrl = this.apiUrl + "getbyoperationclaimid?operationClaimId="+operationClaimId;

    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newApiUrl);
  }
}
