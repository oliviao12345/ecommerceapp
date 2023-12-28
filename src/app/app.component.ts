import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerce-frontend';

  isSideBarOpen: boolean = false;

  toggleSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
