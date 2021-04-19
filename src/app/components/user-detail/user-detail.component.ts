import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  updateUserForm:FormGroup;
  user:User;
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getUserByEmail();
    this.createdUpdateUserForm();
  }

  getUserByEmail(){

    let email = this.localStorageService.getItem('email')
    this.userService.getUserByEmail(String(email))
      .subscribe((response) => {
        this.user = response.data  
      })
  }

  createdUpdateUserForm(){
    this.updateUserForm = this.formBuilder.group({
      id: [this.localStorageService.getItem("userId"), Validators.nullValidator],
      email: [this.localStorageService.getItem("email"), Validators.required],
      firstName : [this.localStorageService.getItem("firstName"), Validators.required],
      lastName: [this.localStorageService.getItem("lastName"), Validators.required],
      passwordHash : [this.localStorageService.getItem("passwordHash"), Validators.nullValidator],
      passwordSalt : [this.localStorageService.getItem("passwordSalt"), Validators.nullValidator],
      status : [this.localStorageService.getItem("status"),Validators.nullValidator],
      customerFindexPoint: [this.localStorageService.getItem("customerFindexPoint"), Validators.nullValidator]
    });
  }

  update(){
    
    if(this.updateUserForm.valid){
      let userModel = Object.assign({}, this.updateUserForm.value);
      userModel.id = Number(userModel.id);
      userModel.status = Boolean(userModel.status);
      userModel.customerFindexPoint = Number(userModel.customerFindexPoint);

      this.userService.updateUser(userModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!!");
          this.localStorageService.setItem("firstName", userModel.firstName);
          this.localStorageService.setItem("lastName", userModel.lastName);
          this.localStorageService.setItem("email", userModel.email);

          this.ngOnInit();
        }, responseError => {
          console.log(responseError);
        })

    }
  }
}
