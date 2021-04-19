import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuth:boolean;
  user:User;

  constructor(private authService:AuthService,
    private userService:UserService,
    private localStorageServie:LocalStorageService,
    private router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getUserById();

    //this.activeClass();
    this.scrollNavbar();
  }

  isAuthenticated(){
    this.isAuth = this.authService.isAuthenticated();
   
  }

  getUserById(){
    let userId = this.localStorageServie.getItem("userId");
    this.userService.getUserById(Number(userId))
      .subscribe((response) => {
        this.user = response.data;
      })
  }

  logout(){
    this.localStorageServie.clearAll();
    this.toastrService.info("Çışış Yapıldı", "Bilgilendirme");
    this.router.navigate(["/login"]);
    setTimeout(() => {
      location.reload();
    });
    
    
  }

  // activeClass(){
  //   var headerElement = document.querySelectorAll(".navbar-nav .nav-item");

  //   headerElement.forEach((item) => {
      
  //     item.cl
  //   })
  // }

  scrollNavbar(){
    window.addEventListener("scroll", () => {
      var scroll = window.scrollY;
      var navComp = document.querySelector(".navbar-comp");
      var bgDark = document.querySelector(".bg-dark");
      
      if(scroll > 200){
        navComp?.classList.add("header-sticky");
      }
      else{
        navComp?.classList.remove("header-sticky")
      }
    })
  }
}
