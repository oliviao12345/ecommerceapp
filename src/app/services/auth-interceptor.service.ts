import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, isAccessToken } from '@okta/okta-auth-js';
import { from, Observable, lastValueFrom, last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  // Intercept HTTP requests and add authorization headers
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  // Handle access to secured endpoints
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const securedEndpoints = ['https://localhost:1235/api/orders'];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {
      // Get access token from OktaAuth
      const accessToken = this.oktaAuth.getAccessToken();
      
      console.log('Access Token: ' , accessToken);

      // Clone the request and add a new header with the access token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + accessToken

        }
      });
    }
    console.log(request);


    // Send the modified request to the next interceptor or the server
    return await lastValueFrom(next.handle(request));
  }
}
