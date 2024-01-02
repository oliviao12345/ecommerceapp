import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/common/cart-item'; // <- Import Cart Item
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { } // <- Inject Cart Service

  ngOnInit() {
      this.listCartDetails();
  }

  listCartDetails(){

    // Get the list of items currently in the shopping cart
    this.cartItems = this.cartService.cartItems;

    // Keep track of the total price of items in the cart by subscribing 
    // to updates 
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // Keep track of the total quantity 
    // of items in the cart by subscribing to updates 
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // Calculate the total price and total quantity 
    // of items in the cart 
    this.cartService.computeCartTotals();
  }
}
