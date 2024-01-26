import { HttpClient } from '@angular/common/http'; // Importing HttpClient module to make HTTP requests
import { Injectable } from '@angular/core'; // Importing Injectable decorator from Angular core module
import { Observable } from 'rxjs'; // Importing Observable from RxJS library
import { OrderHistory } from '../common/order-history'; // Importing OrderHistory interface from a common directory

@Injectable({
  providedIn: 'root' // Marking the service to be provided at the root level
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:1235/api/orders'; // URL for the backend API to retrieve orders

  constructor(private httpClient: HttpClient) { } // Injecting the HttpClient service into the constructor

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`; // Constructing the URL for retrieving order history
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl); // Making an HTTP GET request and returning the response as an Observable of type GetResponseOrderHistory
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[]; // Defining the structure of the response received from the server
  }
}
