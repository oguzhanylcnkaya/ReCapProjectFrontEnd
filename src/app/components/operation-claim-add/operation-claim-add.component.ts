import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-add',
  templateUrl: './operation-claim-add.component.html',
  styleUrls: ['./operation-claim-add.component.scss']
})
export class OperationClaimAddComponent implements OnInit {

  operationClaimAddForm:FormGroup;
  constructor(private operationClaimService:OperationClaimService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createOperationClaimAddForm();
  }

  createOperationClaimAddForm(){
    this.operationClaimAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  add(){
    if(this.operationClaimAddForm.valid){

      let operationClaimModel = Object.assign({}, this.operationClaimAddForm.value);

      this.operationClaimService.add(operationClaimModel)
        .subscribe((response) => {
          this.toastrService.success(response.message,"Başarılı Ekleme");
          this.router.navigate(["/operationClaim"]);
        }, respError => {
          console.log(respError);
        })

    }
  }

}
