import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: any;

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      info: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    })
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
      }
      console.log(product);
    }
  }
}
