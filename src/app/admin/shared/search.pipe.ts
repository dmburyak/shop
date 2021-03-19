import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../shared/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  productName;

  transform(products: Product[], productName: string) {
    if (!productName.trim())
      return products;
    return products.filter(product => {
      return product.name.toLowerCase().includes(productName.toLowerCase())
    })

  }

}
