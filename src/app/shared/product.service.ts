import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse, Product} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = 'Phone';
  cartProducts: Product[] = [];

  constructor(private http: HttpClient) {
  }

  create(product) {
    return this.http.post<FbResponse>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date)
          }
        }
      ))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map(res => Object.keys(res)
        .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          })
        ))
      )
  }

  getById(id) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: any) => ({
            ...res,
            id,
            date: new Date(res.date)
          }
        )
        )
      )
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(id, product) {
    return this.http.patch(`${environment.fbDbUrl}/products/${id}.json`, product)
  }

  setType(type) {
    this.type = type;
  }

  addProduct(product) {
    this.cartProducts.push(product);
  }

}
