import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim',
  templateUrl: './operation-claim.component.html',
  styleUrls: ['./operation-claim.component.scss']
})
export class OperationClaimComponent implements OnInit {

  operationClaims :OperationClaim[];
  operationClaim : OperationClaim;

  constructor(private operationClaimService:OperationClaimService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.operationClaimService.getall()
      .subscribe((response) => {
        this.operationClaims = response.data;
      })
  }

  getById(id:number){
    return this.operationClaimService.getById(id);
  }

  delete(id:number){

    this.getById(id)
      .subscribe((response) => {
        this.operationClaim = response.data;

        this.operationClaimService.delete(this.operationClaim)
          .subscribe((response) => {
            this.toastrService.success(response.message, "Başarılı!");
            this.ngOnInit();
          })
      })
    
  }
}
