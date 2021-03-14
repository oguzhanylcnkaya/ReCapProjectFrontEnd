import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  colorApiUrl = 'https://localhost:44306/api/colors/getall';

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    return this.httpClient
      .get<ListResponseModel<Color>>(this.colorApiUrl);
  }
}
