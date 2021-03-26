import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44306/api/rentals/";

  constructor(private httpClient:HttpClient) { }

  getRentalDetails(): Observable<ListResponseModel<Rental>>{

    let newApiUrl = this.apiUrl + "getrentaldetails";

    return this.httpClient
      .get<ListResponseModel<Rental>>(newApiUrl);
  }

  rentalAdd(rental:Rental): Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "add";

    return this.httpClient
      .post<ResponseModel>(newApiUrl, rental);
  }
}
