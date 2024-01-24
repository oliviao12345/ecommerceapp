import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import {Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from 'src/app/authentication/my-app-config';
import { ProductService } from './services/product.service';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

// Define an array of routes for the application ORDER FROM SPECIFIC TO GENERIC
const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent}, //<<Added This
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id', component: ProductDetailsComponent}, //<<Add for Prod Details
  { path: 'search/:keyword', component: ProductListComponent}, // << ADDED THIS
  // Route for specific category with an ID parameter
  { path: 'category/:id', component: ProductListComponent },
  // Route for general category
  { path: 'category', component: ProductListComponent },
  // Route for products
  { path: 'products', component: ProductListComponent },
  // Default route, redirect to '/products' when the path is empty
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // Wildcard route, redirect to '/products' for any other unknown paths
  { path: '**', redirectTo: '/products', pathMatch: 'full' }

];

@NgModule({
  // Declare the components used in the module
  declarations: [AppComponent, ProductListComponent, ProductCategoryMenuComponent, SearchComponent, ProductDetailsComponent, CartStatusComponent, CartDetailsComponent, CheckoutComponent, LoginComponent, LoginStatusComponent],
  // Import necessary modules and specify the defined routes
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule, //<-- Ng Bootstrap Module
    ReactiveFormsModule,  //<-- Reactive Forms Module
    OktaAuthModule
  ],
  // Provide any services or dependencies
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  // Bootstrap the root component of the application
  bootstrap: [AppComponent],
})
export class AppModule {}

