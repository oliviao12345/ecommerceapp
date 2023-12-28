import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search', // Component selector used in HTML templates
  templateUrl: './search.component.html', // Template file for the component
  styleUrls: ['./search.component.css'], // Stylesheet file(s) for the component
  providers: [Router] // Add Router to the providers array
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }
  // Inject the Router service into the component's constructor

  ngOnInit() {
    // Lifecycle hook called after the component is initialized
  }

  doSearch(value: string) {
    console.log(`value = ${value}`);
    // Log the value parameter to the console

    this.router.navigateByUrl(`/search/${value}`);
    // Navigate to the specified route using the Router service
  }
}
