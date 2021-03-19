import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44306/api/cars/";
  constructor(private httpClient: HttpClient) { }

  getCarDetailByCarId(carId: number) : Observable<ListResponseModel<Car>>{
    let newApiUrl = this.apiUrl + "getcardetailsbyid?carId=" + carId;

    return this.httpClient.get<ListResponseModel<Car>>(newApiUrl);
  }
}
