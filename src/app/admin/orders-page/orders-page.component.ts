import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from 'src/app/shared/order.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: any[] = []
  pSub!: Subscription
  rSub!: Subscription


  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  remove(id) {
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }

}
