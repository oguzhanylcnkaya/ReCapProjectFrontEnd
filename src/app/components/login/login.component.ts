import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm(){
      this.loginForm = this.formBuilder.group({
        email: ["", Validators.required],
        password: ["", Validators.required]
      })
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email : ["", Validators.required],
      password : ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    });
  }

  login(){

    if(this.loginForm.valid){
      
      let loginModel = Object.assign({}, this.loginForm.value);
      
      this.authService.login(loginModel)
        .subscribe((response) => {

          this.localStorageService.setItem("token", response.data.token);
          this.localStorageService.setItem("email", loginModel.email);
          this.toastrService.info(response.message, "Giriş Başarılı!");

          this.userService.getUserByEmail(String(loginModel.email))
            .subscribe((response) => {
              this.localStorageService.setItem("userId", response.data.id);
              this.localStorageService.setItem("firstName", response.data.firstName);
              this.localStorageService.setItem("lastName", response.data.lastName);
              this.localStorageService.setItem("passwordHash", response.data.passwordHash);
              this.localStorageService.setItem("passwordSalt", response.data.passwordSalt);
              this.localStorageService.setItem("status", response.data.status);
            })

          this.router.navigate(["/"]);
          setTimeout(() => { 
            location.reload();
          });

        }, responseError => {
            console.log(responseError);

            if(responseError.error.length > 0){

              this.toastrService.error(responseError.error, "Hata!")

            }
        })
    }
    else{
      this.toastrService.error("Lütfen tüm alanları doldurunuz!", "Boş Alan");
    }
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value);

      this.authService.register(registerModel)
        .subscribe((response) => {

          this.toastrService.info(response.message, "Başarılı Kaydolma!")
          this.localStorageService.setItem("token", response.data.token);

        }, responseError => {
          console.log(responseError);

          if(responseError.error.Errors.length > 0){

            this.toastrService.error(responseError.error.Message, "Hata!");
          }
        })
    }
  }
}
