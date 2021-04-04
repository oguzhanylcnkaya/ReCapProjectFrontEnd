import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44306/api/colors/';

  avtiveColorId: number;

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{

    let newApiUrl = this.apiUrl + "getall";

    return this.httpClient
      .get<ListResponseModel<Color>>(newApiUrl);
  }

  addColor(color:Color) : Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "add"

    return this.httpClient.post<ResponseModel>(newApiUrl, color);
  }

  updateColor(color:Color) : Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, color);
  }

  setClassColorId(id:number){
    this.avtiveColorId = id;
  }

}
