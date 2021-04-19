import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl = "https://localhost:44306/api/operationClaims/";
  constructor(private httpClient:HttpClient) { }

  add(operationClaim:OperationClaim):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(newApiUrl, operationClaim);
  }

  update(operationClaim:OperationClaim):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, operationClaim);
  }

  delete(operationClaim:OperationClaim):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "delete";

    return this.httpClient.post<ResponseModel>(newApiUrl, operationClaim);
  }

  getall():Observable<ListResponseModel<OperationClaim>>{
    let newApiUrl = this.apiUrl + "getall";

    return this.httpClient.get<ListResponseModel<OperationClaim>>(newApiUrl);
  }

  getById(id:number):Observable<SingleResponseModel<OperationClaim>>{
    let newApiUrl = this.apiUrl + "getbyid?id=" + id;

    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newApiUrl);
  }
}
