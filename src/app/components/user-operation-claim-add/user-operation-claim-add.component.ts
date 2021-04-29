import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-operation-claim-add',
  templateUrl: './user-operation-claim-add.component.html',
  styleUrls: ['./user-operation-claim-add.component.scss']
})
export class UserOperationClaimAddComponent implements OnInit {

  operationClaims:OperationClaim[];
  users:User[];

  userOperationClaimAddForm:FormGroup;

  constructor(private operationClaimService:OperationClaimService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private userOperationClaimService:UserOperationClaimService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {

    this.createUserOperationClaimAddForm();

    this.getOperation();
    this.getUsers();
  }

  getUsers(){
    this.userService.getAll()
      .subscribe((response) => {
        this.users = response.data;
      })
  }

  getOperation(){
    this.operationClaimService.getall()
      .subscribe((response) => {
        this.operationClaims = response.data;
      })
  }

  createUserOperationClaimAddForm(){
    this.userOperationClaimAddForm = this.formBuilder.group({
      userId : ["", Validators.required],
      operationClaimId : ["", Validators.required]
    })
  }

  addUserOperationClaim(){
    if(this.userOperationClaimAddForm.valid){

      let userOperationClaimModel = Object.assign({}, this.userOperationClaimAddForm.value);
      userOperationClaimModel.userId = Number(userOperationClaimModel.userId);
      userOperationClaimModel.operationClaimId = Number(userOperationClaimModel.operationClaimId);

      this.userOperationClaimService.add(userOperationClaimModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!");
          this.router.navigate(["/userOperationClaim"]);
        }, responseError => {
          console.log(responseError);
        })

    }
  }
}
