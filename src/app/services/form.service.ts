import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs'; //rxjs = reactive js framework

@Injectable({
  providedIn: 'root'
})
// Define a class named FormService
export class FormService {
  
  // Constructor function
  constructor() { }
  
  // Function to get an array of credit card months
  // Takes a startMonth as input and returns an Observable<number[]>
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    
    // Loop from startMonth to 12 and push each month to the data array
    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    
    return of(data); // The of operator will wrap the array as an Observable
  }
  
  // Function to get an array of credit card years
  // Returns an Observable<number[]>
  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];
    
    // Get the current year
    const startYear: number = new Date().getFullYear();
    
    // Calculate the end year as 10 years from the current year
    const endYear: number = startYear + 10;
    
    // Loop from startYear to endYear and push each year to the data array
    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }
    
    return of(data); // The of operator will wrap the array as an Observable
  }
}

