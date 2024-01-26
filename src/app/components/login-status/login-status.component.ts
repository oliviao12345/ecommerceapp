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

  storage: Storage = sessionStorage; //Reference to web browser's session storage

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
    //check if user is auth
    if (this.isAuthenticated) {
    
      //if user is auth, get the logged in users details
      this.oktaAuth.getUser().then(
        (res) => {
          //get the users full name and update the userFullname variable with it
          this.userFullName = res.name as string; 
        
        //retrieve the users email from auth response
        const theEmail = res.email;

        //store the users email in browser storage and convert the a json string before being stored
        this.storage.setItem('userEmail', JSON.stringify(theEmail));
        
        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }
}
