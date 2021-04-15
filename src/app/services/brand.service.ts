import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44306/api/brands/';
  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>>{
    
    let newApiUrl = this.apiUrl + "getall";

    return this.httpClient
      .get<ListResponseModel<Brand>>(newApiUrl);
  }

  getBrandId(id:number) : Observable<SingleResponseModel<Brand>>{
    let newApiUrl = this.apiUrl + "getBrandByID?id=" + id;

    return this.httpClient.get<SingleResponseModel<Brand>>(newApiUrl);
  }

  addBrand(brand:Brand): Observable<ResponseModel>{
    
    let newApiUrl = this.apiUrl + "add";

    return this.httpClient
      .post<ResponseModel>(newApiUrl, brand);

  }

  updateBrand(brand:Brand): Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, brand);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newApiUrl = this.apiUrl + "delete";

    return this.httpClient.post<ResponseModel>(newApiUrl, brand);
  }
}
