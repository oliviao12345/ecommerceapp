import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup; // Declare form group
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {} // Inject the form builder

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''], // Set the form fields and set initial value to an empty string
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        town: [''],
        postCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        town: [''],
        postCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expMonth: [''],
        expYear: ['']
      }),
    });

    // Get the current month and assign it to the variable startMonth
    const startMonth: number = new Date().getMonth() + 1;

    // Log the value of startMonth to the console
    console.log('startMonth: ' + startMonth);

    // Call the getCreditCardMonths function of the formService and subscribe to the returned Observable
    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      // Log the retrieved credit card months to the console as a JSON string
      console.log('Retrieved credit card months: ' + JSON.stringify(data));

      // Assign the retrieved credit card months to the creditCardMonths property
      this.creditCardMonths = data;
    });

    // Call the getCreditCardYears function of the formService and subscribe to the returned Observable
    this.formService.getCreditCardYears().subscribe((data) => {
      // Log the retrieved credit card years to the console as a JSON string
      console.log('Retrieved credit card years: ' + JSON.stringify(data));

      // Assign the retrieved credit card years to the creditCardYears property
      this.creditCardYears = data;
    });
  }

  copyShippingAddressToBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls["billingAddress"]
            .setValue(this.checkoutFormGroup.controls["shippingAddress"].value);
    }
    else {
      this.checkoutFormGroup.controls["billingAddress"].reset();
    }
    
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value); // Access the entire form group values
    console.log(
      'The email address is: ' +
        this.checkoutFormGroup.get('customer')?.value.email
    ); // Access only the email address from the form
  }
}
