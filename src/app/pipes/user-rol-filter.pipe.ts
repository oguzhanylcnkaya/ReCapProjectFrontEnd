import { Pipe, PipeTransform } from '@angular/core';
import { UserOperationClaimDetails } from '../models/userOperationClaimDetails';

@Pipe({
  name: 'userRolFilter'
})
export class UserRolFilterPipe implements PipeTransform {

  transform(value: UserOperationClaimDetails[], userRolFilter:string): UserOperationClaimDetails[] {
    
    userRolFilter = userRolFilter ? userRolFilter.toLocaleLowerCase() : '';

    return userRolFilter 
      ? value.filter((userRolDetail:UserOperationClaimDetails) => userRolDetail.userFullName.toLocaleLowerCase().indexOf(userRolFilter) !== -1
      || userRolDetail.operationName.toLocaleLowerCase().indexOf(userRolFilter) !== -1)
      : value ;

  }

}
