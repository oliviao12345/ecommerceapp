import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/common/cart-item'; // Add Cart Item Import
import { CartService } from 'src/app/services/cart.service'; // Add Cart SVC Import

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService, //<<- Inject Cart Service
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  //Implement Add to Cart Method for Prod Details Page
  addToCart() {
    console.log(
      `Adding to cart: ${this.product.name}, ${this.product.unitPrice}`
    );

    const theCartItem = new CartItem(this.product);

    this.cartService.addToCart(theCartItem); // Call the Cart Service
  }

  handleProductDetails() {
    //get the id param string and conver string to a number using the + symbol

    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
}
