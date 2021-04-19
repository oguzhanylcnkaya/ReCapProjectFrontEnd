import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-update',
  templateUrl: './operation-claim-update.component.html',
  styleUrls: ['./operation-claim-update.component.scss']
})
export class OperationClaimUpdateComponent implements OnInit {

  operationClaimUpdateForm:FormGroup;
  operationClaimId:number;

  operationClaim:OperationClaim;

  constructor(private operationClaimService:OperationClaimService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe((param) => {
        if(param["id"]){
          this.operationClaimId = param["id"];
          this.getById(param["id"])
        }
      })

    this.createOperationClaimUpdateForm();
  }

  createOperationClaimUpdateForm(){
    this.operationClaimUpdateForm = this.formBuilder.group({
      name : ["", Validators.required]
    })
  }

  update(){

    if(this.operationClaimUpdateForm.valid){

      let operationClaimUpdateModel = Object.assign({}, this.operationClaimUpdateForm.value);
      operationClaimUpdateModel.id = Number(this.operationClaimId);

      this.operationClaimService.update(operationClaimUpdateModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Güncelleme Başarılı!");
          this.router.navigate(["/operationClaim"]);
        }, respError => {
          console.log(respError);
        })

    }

  }

  getById(id:number){
    this.operationClaimService.getById(id)
      .subscribe((response) => {
        this.operationClaim = response.data;
      })
  }

}
