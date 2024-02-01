import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from 'src/app/authentication/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  ngOnInit() {
    this.oktaSignIn.remove(); // Remove any existing Okta sign-in widget

    this.oktaSignIn.renderEl({
      el: '#okta-sign-in-widget' // Render the Okta sign-in widget in the element with id 'okta-sign-in-widget' in login.component.html
    },
    (response: any) => { // Callback function when the sign-in widget is rendered successfully
      if (response.status === 'SUCCESS') { // If the user successfully signs in
        console.log('User successfully signed in:', response);
        this.oktaAuth.signInWithRedirect(); // Redirect the user to the Okta sign-in page
      }
    },
    (error: any) => { // Callback function when an error occurs during rendering the sign-in widget
      console.error('Error rendering sign-in widget:', error);
      throw error; // Throw the error to handle it elsewhere
    });
  }

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    // Create a new instance of OktaSignIn and assign it to the oktaSignIn property
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/images/logo.png', // Set the logo image for the sign-in widget
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0], // Set the base URL for Okta authentication
      clientId: myAppConfig.oidc.clientId, // Set the client ID for Okta authentication
      redirectUri: myAppConfig.oidc.redirectUri, // Set the redirect URI after authentication
      authParams: {
        pkce: true, // Enable Proof Key for Code Exchange (PKCE) for added security
        issuer: myAppConfig.oidc.issuer, // Set the issuer URL for Okta authentication
        scopes: myAppConfig.oidc.scopes // Set the scopes for authorization
      }
    });
  }
}
