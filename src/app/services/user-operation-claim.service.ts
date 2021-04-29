import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserOperationClaimDetails } from '../models/userOperationClaimDetails';

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


  getAllDetails():Observable<ListResponseModel<UserOperationClaimDetails>>{
    let newApiUrl = this.apiUrl + "getalldetails";

    return this.httpClient.get<ListResponseModel<UserOperationClaimDetails>>(newApiUrl);
  }

  getDetailsById(id:number):Observable<SingleResponseModel<UserOperationClaimDetails>>{
    let newApiUrl = this.apiUrl + "getdetailsbyid?id="+ id;

    return this.httpClient.get<SingleResponseModel<UserOperationClaimDetails>>(newApiUrl);
  }

  getDetailsByOperationClaimId(operationClaimId:number):Observable<ListResponseModel<UserOperationClaimDetails>>{
    let newApiUrl = this.apiUrl + "getdetailsbyoperationclaimid?operationClaimId="+ operationClaimId;

    return this.httpClient.get<ListResponseModel<UserOperationClaimDetails>>(newApiUrl);
  }

  getDetailsByUserId(userId:number):Observable<ListResponseModel<UserOperationClaimDetails>>{
    let newApiUrl = this.apiUrl + "getdetailsbyuserid?userId="+ userId;

    return this.httpClient.get<ListResponseModel<UserOperationClaimDetails>>(newApiUrl);
  }
}
