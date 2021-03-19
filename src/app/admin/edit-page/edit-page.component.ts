import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/product.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: any;
  product!: Product;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(
        params => {
          return this.productService.getById(params['id'])
        }
      )).subscribe(
      product => {
        this.product = product;
        this.form = new FormGroup({
          type: new FormControl(this.product.type, Validators.required),
          name: new FormControl(this.product.name, Validators.required),
          photo: new FormControl(this.product.photo, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required)
        })
      }
    )
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const product = {
        type: this.form.value.type,
        name: this.form.value.name,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date()
      }
      this.submitted = true;
      this.productService.update(this.product.id, product)
        .subscribe(
          res => {
            this.submitted = false;
            this.router.navigate(['/admin', 'dashboard'])
          },
          () => {
            this.submitted = false;
          }
        )
    }
  }

}
