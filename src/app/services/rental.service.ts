import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  rental:Rental;
  apiUrl = "https://localhost:44306/api/rentals/";

  constructor(private httpClient:HttpClient) { }

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>>{

    let newApiUrl = this.apiUrl + "getrentaldetails";

    return this.httpClient
      .get<ListResponseModel<RentalDetail>>(newApiUrl);
  }

  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{

    let newApiUrl = this.apiUrl + "getrentalbycarid?carId=" + carId;

    return this.httpClient.get<ListResponseModel<Rental>>(newApiUrl);

  }

  rentalAdd(rental:Rental): Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "add";

    return this.httpClient
      .post<ResponseModel>(newApiUrl, rental);
  }

  isCarAvailable(carId:number): Observable<boolean>{

    let newApiUrl = this.apiUrl + "iscaravailable?carId=" + carId;

    return this.httpClient.get<boolean>(newApiUrl);

  }

  setRental(rental:Rental){
    this.rental = rental;
  }

  getRental(){
    return this.rental;
  }
}
