import { Component } from '@angular/core';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { OrderHistory } from 'src/app/common/order-history';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService){}

  ngOnInit(): void{
    this.handleOrderHistory();
  }


  handleOrderHistory() {
   
    //read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    //retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }
}
