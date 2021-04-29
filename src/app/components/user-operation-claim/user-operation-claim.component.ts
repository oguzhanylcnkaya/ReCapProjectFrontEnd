import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserOperationClaimDetails } from 'src/app/models/userOperationClaimDetails';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrls: ['./user-operation-claim.component.scss']
})
export class UserOperationClaimComponent implements OnInit {

  userOperationClaim:UserOperationClaim;

  userOperationClaims:UserOperationClaim[];
  userOperationClaimDetails:UserOperationClaimDetails[];

  userRolFilter:string;

  constructor(private userOperationService:UserOperationClaimService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllDetails();
  }

  getAll(){
    this.userOperationService.getall()
      .subscribe((response) => {
        this.userOperationClaims = response.data;
      })
  }

  getAllDetails(){
    this.userOperationService.getAllDetails()
      .subscribe((response) => {
        this.userOperationClaimDetails = response.data;
      })
  }

  getById(id:number){
    return this.userOperationService.getById(id);
  }

  delete(id:number){
    this.getById(id)
      .subscribe((response) => {
        this.userOperationClaim = response.data;

        this.userOperationService.delete(this.userOperationClaim)
          .subscribe((response)=> {
            this.toastrService.success(response.message, "Başarılı!")
            this.ngOnInit();
          })
      })
  }
}
