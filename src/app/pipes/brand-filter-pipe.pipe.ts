import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilterPipe'
})
export class BrandFilterPipePipe implements PipeTransform {

  transform(value: Brand[], brandFilter : string): Brand[] {
    
      brandFilter = brandFilter ? brandFilter.toLocaleLowerCase() : "";

      return brandFilter 
        ? value.filter((brand: Brand) => brand.name.toLocaleLowerCase().indexOf(brandFilter) !== -1)
        : value;
  }

}
