import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-operation-claim-update',
  templateUrl: './user-operation-claim-update.component.html',
  styleUrls: ['./user-operation-claim-update.component.scss']
})
export class UserOperationClaimUpdateComponent implements OnInit {

  users:User[];
  operationClaims:OperationClaim[];

  userOperationClaimUpdateForm: FormGroup;

  userOperationClaim:UserOperationClaim;

  constructor(private userService:UserService,
    private operationClaimService:OperationClaimService,
    private formBuilder:FormBuilder,
    private userOperationClaimService:UserOperationClaimService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getOperation();
    this.getUsers();

    this.createUserOperationClaimUpdateForm();

    this.activatedRoute.params
      .subscribe((param) => {
        if(param["id"]){
          this.getOperationClaimById(param["id"])
        }
      })
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

  createUserOperationClaimUpdateForm(){
    this.userOperationClaimUpdateForm = this.formBuilder.group({
      userId : ["", Validators.required],
      operationClaimId : ["", Validators.required]
    })
  }

  update(){
    if(this.userOperationClaimUpdateForm.valid){
      let userOperationClaimUpdateModel = Object.assign({}, this.userOperationClaimUpdateForm.value);
      userOperationClaimUpdateModel.id = Number(this.userOperationClaim.id);
      userOperationClaimUpdateModel.userId = Number(userOperationClaimUpdateModel.userId);
      userOperationClaimUpdateModel.operationClaimId = Number(userOperationClaimUpdateModel.operationClaimId);

      this.userOperationClaimService.update(userOperationClaimUpdateModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı Güncelleme!")
          this.router.navigate(["/userOperationClaim"]);
        })

    }
  }

  getOperationClaimById(id:number){
    this.userOperationClaimService.getById(id)
      .subscribe((response) => {
        this.userOperationClaim = response.data;
      })
  }

}
