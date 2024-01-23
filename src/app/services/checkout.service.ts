import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:1235/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }
  // The constructor is a special method that is automatically called when an instance of the class is created.
  // It takes an instance of the HttpClient class as a parameter and assigns it to the private property 'httpClient'.

  placeOrder(purchase: Purchase): Observable<any>{
    // The 'placeOrder' method takes a 'Purchase' object as a parameter and returns an Observable that emits a response.
    // It is used to send a POST request to the 'purchaseUrl' endpoint with the provided 'purchase' object as the request body.
    // The response from the server is wrapped in an Observable and returned.
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
