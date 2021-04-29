import { Pipe, PipeTransform } from '@angular/core';
import { OperationClaim } from '../models/operationClaim';

@Pipe({
  name: 'rolFilter'
})
export class RolFilterPipe implements PipeTransform {

  transform(value: OperationClaim[], rolNameFilter: string): OperationClaim[] {
    
    rolNameFilter = rolNameFilter ? rolNameFilter.toLocaleLowerCase() : '';
    
    return rolNameFilter 
      ? value.filter((operationClaim:OperationClaim) => operationClaim.name.toLocaleLowerCase().indexOf(rolNameFilter) !== -1)
      :value; 
  }

}
