import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  // @ts-ignore
  form: FormGroup;
  submitted = false;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {

  }
}


// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
// apiKey: "AIzaSyDNgMp0bfvueFAWvrrBAs2odyVTW6mGJbM
