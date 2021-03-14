import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerApiUrl ="https://localhost:44306/api/customers/getall";
  constructor(private httpClient: HttpClient) { }

  getCustomers() :Observable<ListResponseModel<Customer>>{
    return this.httpClient
      .get<ListResponseModel<Customer>>(this.customerApiUrl);
  }
}
