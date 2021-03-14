import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  carsDetailsApiUrl = "https://localhost:44306/api/cars/getcardetails";
  constructor(private httpClient: HttpClient) { }

  getCarsDetails() : Observable<ListResponseModel<Car>>{
    return this.httpClient
    .get<ListResponseModel<Car>>(this.carsDetailsApiUrl);
  }
}
