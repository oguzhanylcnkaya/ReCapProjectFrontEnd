import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl ="https://localhost:44306/api/customers/";
  constructor(private httpClient: HttpClient) { }

  getCustomers() :Observable<ListResponseModel<Customer>>{

    let newApiUrl = this.apiUrl + "getall";

    return this.httpClient
      .get<ListResponseModel<Customer>>(newApiUrl);
  }

  getCustomersDetail() :Observable<ListResponseModel<CustomerDetail>>{

    let newApiUrl = this.apiUrl + "getcustomersdetail";

    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newApiUrl);
  }
}
