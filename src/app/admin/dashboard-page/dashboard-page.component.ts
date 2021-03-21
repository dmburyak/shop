import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  products: any[] = [];

  getAllSubscription!: Subscription;
  removeSubscription!: Subscription;
  productName = '';

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getAll().subscribe(
      (products) => {
        this.products = products;
      })
  }

  ngOnDestroy() {
    if (this.getAllSubscription) {
      this.getAllSubscription.unsubscribe()
    }

    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe()
    }
  }

  remove(id) {
    this.productService.remove(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id != id);
      }
    )
  }
}
