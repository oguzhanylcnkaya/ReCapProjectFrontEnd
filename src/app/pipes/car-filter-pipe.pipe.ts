import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[], carNameFilter: string): Car[] {
    
    carNameFilter = carNameFilter ? carNameFilter.toLocaleLowerCase() : '';

    return carNameFilter
      ? value.filter((car: Car) => car.carName.toLocaleLowerCase().indexOf(carNameFilter) !== -1)
      : value;
  }

}
