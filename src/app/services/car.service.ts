import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44306/api/cars/";
  constructor(private httpClient: HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{

    let newApiUrl = this.apiUrl + "getcardetails";

    return this.httpClient
    .get<ListResponseModel<Car>>(newApiUrl);
  }

  getCarsByBrand(brandId: number) : Observable<ListResponseModel<Car>>{
    let newApiUrl = this.apiUrl + "getcarsbybrandid?brandId=" + brandId;

    return this.httpClient
      .get<ListResponseModel<Car>>(newApiUrl);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>>{
    let newApiUrl = this.apiUrl + "getcarsbycolorid?colorId=" + colorId;

    return this.httpClient
      .get<ListResponseModel<Car>>(newApiUrl);
  }

  getCarsByBrandAndColorId(brandId:number, colorId:number) : Observable<ListResponseModel<Car>>{
    let newApiUrl = this.apiUrl + "getcarsbybrandidcolorid?brandId=" + brandId + "&colorId= " + colorId;

    return this.httpClient
    .get<ListResponseModel<Car>>(newApiUrl);
  }

  addCar(car: Car): Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "add";

    return this.httpClient.post<ResponseModel>(newApiUrl, car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    
    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, car);
  }

}
