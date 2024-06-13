import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], key: any):any {
    if(products.length==0) return [];
    if(key=="") return products;
    key=key.toLowerCase()
    return products.filter((item:any)=>item.title.toLowerCase().includes(key.trim()))
  }

}
