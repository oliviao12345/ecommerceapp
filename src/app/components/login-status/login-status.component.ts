// Importing necessary modules and dependencies
import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status', // Component selector used in HTML templates
  templateUrl: './login-status.component.html', // Path to the component's HTML template
  styleUrls: ['./login-status.component.css'] // Path to the component's CSS styles
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false; // Variable to track if the user is authenticated
  userFullName: string = ''; // Variable to store the full name of the user

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  ngOnInit() {
    // Subscribe to the authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!; // Update the isAuthenticated variable
        this.getUserDetails(); // Fetch user details after authentication state changes
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details

      // Retrieve the user's full name from the response
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string; // Update the userFullName variable
        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }
}
