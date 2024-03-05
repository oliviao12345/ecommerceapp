import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Country } from '../country';
import { Town } from '../town';
import { CustomValidators } from '../../validators/customvalidators';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router'; // Correct import statement
import { OrderItem } from 'src/app/common/order-item';
import { Order } from 'src/app/common/order';
import { Purchase } from 'src/app/common/purchase';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from 'src/app/common/payment-info';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup; // Declare form group
  totalPrice: number = 0; // Initialize total price variable
  totalQuantity: number = 0; // Initialize total quantity variable
  creditCardYears: number[] = []; // Initialize an array to store credit card years
  creditCardMonths: number[] = []; // Initialize an array to store credit card months
  countries: Country[] = []; // Initialize an array to store countries
  shippingAddressTowns: Town[] = []; // Initialize an array to store shipping address towns
  billingAddressTowns: Town[] = []; // Initialize an array to store billing address towns
  storage: Storage = sessionStorage; //Reference to browser session storage
  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {} // Inject the form builder, form service, and cart service
  ngOnInit(): void {
    this.setUpStripePaymentForm();
    this.reviewCartDetails();

    //read the users email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        email: new FormControl(theEmail, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        town: new FormControl('', [Validators.required]),
        postCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
        town: new FormControl('', [Validators.required]),
        postCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhitespace,
        ]),
      }),

      creditCard: this.formBuilder.group({

      })
    });

    //Populate the countries
    this.formService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }
  setUpStripePaymentForm() {
    // Get a handle to the Stripe elements object
    var elements = this.stripe.elements();

    // Create a card element and configure it to hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Mount the card element UI component into the div with id 'card-element'
    this.cardElement.mount('#card-element');

    // Add an event listener for the 'change' event on the card element
    this.cardElement.on('change', (event: any) => {
      // Get a reference to the element where card errors will be displayed
      this.displayError = document.getElementById('card-errors');

      // Check if the card entry is complete
      if (event.complete) {
        // Clear any existing error messages
        this.displayError.textContent = '';
      } else if (event.error) {
        // Display the error message if there is an issue with the card information
        this.displayError.textContent = event.error.message;
      }
    });
  }

  reviewCartDetails() {
    //subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );

    //subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  get ccCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get ccNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get ccSecCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  get ccCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get ccExpMonth() {
    return this.checkoutFormGroup.get('creditCard.expirationMonth');
  }
  get ccExpYear() {
    return this.checkoutFormGroup.get('creditCard.expirationYear');
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressTown() {
    return this.checkoutFormGroup.get('shippingAddress.town');
  }
  get shippingAddressPostcode() {
    return this.checkoutFormGroup.get('shippingAddress.postCode');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingAddressTown() {
    return this.checkoutFormGroup.get('billingAddress.town');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressPostcode() {
    return this.checkoutFormGroup.get('billingAddress.postCode');
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expYear);

    //if the current year equals the selected year, then start with current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      this.billingAddressTowns = this.shippingAddressTowns;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressTowns = [];
    }
  }

  onSubmit() {
    console.log('Handling the submit button');

    // set up order
    let order = new Order(this.totalPrice, this.totalQuantity);
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(
      (tempCartItem) => new OrderItem(tempCartItem)
    );

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress =
      this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: Town = JSON.parse(
      JSON.stringify(purchase.shippingAddress.town)
    );
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );
    purchase.shippingAddress.town = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress =
      this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: Town = JSON.parse(
      JSON.stringify(purchase.billingAddress.town)
    );
    const billingCountry: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.town = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // compute payment info
    this.paymentInfo.amount = this.totalPrice * 100;
    this.paymentInfo.currency = 'GBP';

    // call REST API via the CheckoutService
    if (
      !this.checkoutFormGroup.invalid &&
      this.displayError.textContent === ''
    ) {
      this.checkoutService
        .createPaymentIntent(this.paymentInfo)
        .subscribe((paymentIntentResponse) => {
          this.stripe
            .confirmCardPayment(
              paymentIntentResponse.client_secret,
              {
                payment_method: {
                  card: this.cardElement,
                },
              },
              { handleActions: false }
            )
            .then((result: any) => {
              if (result.error) {
                // inform the customer there was an error
                alert(`There was an errror: ${result.error.message}`);
              } else {
                this.checkoutService.placeOrder(purchase).subscribe({
                  next: (response: any) => {
                    alert(
                      `Your order has been received. \nOrder tracking number ${response.orderTrackingNumber}`
                    );

                    //reset cart
                    this.resetCart();
                  },
                  error: (err: any) => {
                    alert(`There was an error: ${err.message}`);
                  },
                });
              }
            });
        });
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  resetCart() {
    console.log('Cart has been reset');

    //reset cart data
    this.cartService.cartItems = []; // Set cart items to an empty array
    this.cartService.totalPrice.next(0); // Send out 0 as the total price
    this.cartService.totalQuantity.next(0); // Send out 0 as the total quantity

    //reset the form
    this.checkoutFormGroup.reset();

    //navigate back to the products page
    this.router.navigateByUrl('/products');
  }

  getTowns(formGroupName: string) {
    // Function to get towns based on the selected country in a form group

    const formGroup = this.checkoutFormGroup.get(formGroupName); // Get the form group based on the provided form group name

    const countryCode = formGroup?.value.country.code; // Get the selected country code from the form group
    const countryName = formGroup?.value.country.name; // Get the selected country name from the form group

    console.log(`${formGroupName} country code: ${countryCode}`); // Log the form group name and selected country code
    console.log(`${formGroupName} country name: ${countryName}`); // Log the form group name and selected country name

    this.formService.getTowns(countryCode).subscribe(
      // Call the form service to get towns based on the country code
      (data) => {
        if (formGroupName === 'shippingAddress') {
          // Check if the form group name is 'shippingAddress'
          this.shippingAddressTowns = data; // Assign the received towns to the shippingAddressTowns array
        } else {
          this.billingAddressTowns = data; // Assign the received towns to the billingAddressTowns array
        }

        // Select the first item by default
        formGroup?.get('state')?.setValue(data[0]); // Set the value of 'town' control in the form group to the first town in the received data
      }
    );
  }
}
