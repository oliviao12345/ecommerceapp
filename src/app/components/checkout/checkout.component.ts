import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Country } from '../country';
import { Town } from '../town';

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
  

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {} // Inject the form builder and service

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
      })
    });

    //Populate the countries
    this.formService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )



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

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expYear)
  
    //if the current year equals the selected year, then start with current month
    
    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
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

  getTowns(formGroupName: string) { // Function to get towns based on the selected country in a form group

    const formGroup = this.checkoutFormGroup.get(formGroupName); // Get the form group based on the provided form group name
  
    const countryCode = formGroup?.value.country.code; // Get the selected country code from the form group
    const countryName = formGroup?.value.country.name; // Get the selected country name from the form group
  
    console.log(`${formGroupName} country code: ${countryCode}`); // Log the form group name and selected country code
    console.log(`${formGroupName} country name: ${countryName}`); // Log the form group name and selected country name
  
    this.formService.getTowns(countryCode).subscribe( // Call the form service to get towns based on the country code
      data => {
  
        if (formGroupName === 'shippingAddress') { // Check if the form group name is 'shippingAddress'
          this.shippingAddressTowns = data; // Assign the received towns to the shippingAddressTowns array
        }
        else {
          this.billingAddressTowns = data; // Assign the received towns to the billingAddressTowns array
        }
  
        // Select the first item by default
        formGroup?.get('state')?.setValue(data[0]); // Set the value of 'town' control in the form group to the first town in the received data
      }
    );
  }
  
}


