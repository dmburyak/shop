import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

  constructor(public http: HttpClient) {
  }

  login(user: any) {
    return this.http.post(this.url, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token')
  }

  public logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
