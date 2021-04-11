import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = "https://localhost:44306/api/cards/";

  constructor(private httpClient:HttpClient) { }

  addCard(card:Card):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(newApiUrl, card);
  }

  getAll():Observable<ListResponseModel<Card>>{

    let newApiUrl = this.apiUrl + "getall";

    return this.httpClient.get<ListResponseModel<Card>>(newApiUrl);

  }

  getByCustomerId(customerId:number):Observable<ListResponseModel<Card>>{
    let newApiUrl = this.apiUrl + "getbycustomerid?customerId=" + customerId;

    return this.httpClient.get<ListResponseModel<Card>>(newApiUrl);
  }

  getByCardId(cardId:number):Observable<SingleResponseModel<Card>>{
    let newApiUrl = this.apiUrl + "getbycardid?cardId="+cardId;

    return this.httpClient.get<SingleResponseModel<Card>>(newApiUrl);
  }
}
