import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Country } from '../components/country';
import { Town } from '../components/town';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private countriesUrl = 'http://localhost:1235/api/countries';
  private townsUrl = 'http://localhost:1235/api/towns/';

  constructor(private httpClient: HttpClient) { }

  getTowns(theCountryCode: string): Observable<Town[]>{
    //search url
    const searchTownsUrl = `${this.townsUrl}search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseTowns>(searchTownsUrl).pipe(
      map(response => response._embedded.towns)
    );
  }

  // Map the JSON data from Spring Data REST to Country Array
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
      
    );
  }

  

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}

//Unwrap the JSON from Spring Data Rest embedded entry
interface GetResponseTowns{
  _embedded: {
    towns: Town[];
  }
}

//Unwrap the JSON from Spring Data Rest embedded entry
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}