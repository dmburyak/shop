import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {OrderService} from '../shared/order.service';
import {Product} from '../shared/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts: Product[] = []
  totalPrice = 0

  form: any
  submitted = false

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    this.orderService.create(order).subscribe(res => {
      this.form.reset()
      this.submitted = false
    })
  }

  delete(product: Product) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }

}
