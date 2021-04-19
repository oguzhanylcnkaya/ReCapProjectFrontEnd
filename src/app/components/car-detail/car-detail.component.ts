import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  carDetail: Car;
  user:User;
  modelYear: Date;

  carImages: CarImage[] = [];
  carImageBasePath = "https://localhost:44306/images/";

  showCarAvail: boolean;

  showFindexAvail:boolean = false;

  showAlert:boolean = false;

  carId:number;
  isCarRentedBySomeone: boolean;
  rentalLastInfo:Rental;

  isAuth:boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private carImageService: CarImageService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getUser();

    this.activatedRoute.params.subscribe((param) => {
      if(param["carId"]){
        this.carId = param["carId"];
        this.getCarDetailByCarId(param["carId"]);
        this.isCarAvailable(param["carId"]);
      }

      this.getCarImageByCarId();
    
    });

    this.checkCarIsAvailable();
  }

  getCarDetailByCarId(carId: number){
    this.carDetailService.getCarDetailByCarId(carId)
    .subscribe((response) => {
      this.carDetail = response.data[0];
      this.modelYear = new Date(this.carDetail.modelYear);
      console.log(this.carDetail);
    });
  }

  getUser(){

    let userId = this.localStorageService.getItem("userId")

    this.userService.getUserById(Number(userId))
      .subscribe((response) => {
        this.user = response.data;
        console.log(this.user);
      })
  }

  getCarImageByCarId(){
    this.carImageService.getCarImageByCarId(this.activatedRoute.snapshot.params["carId"])
      .subscribe((response) => {
        this.carImages = response.data;
        console.log(this.carImages);
      });
  }

  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  } 

  isCarAvailable(carId:number){
    this.rentalService.isCarAvailable(carId)
      .subscribe((response) => {
        this.showCarAvail = response;
      }, responseEror => {
        this.showAlert = true;
      })

  }

  //Aracın başkası tarafından kiralanıp geri getirme tarihi kontrolü
  checkCarIsAvailable(){
    this.rentalService.getRentalByCarId(this.carId)
      .subscribe((response) => {
        
        if(response.data.length > 0){

          this.rentalLastInfo = response.data[response.data.length -1]
          
          var returnDate = new Date(this.rentalLastInfo.returnDate);
          var today = new Date();

          if(returnDate >= today){
            this.toastrService.error("Araç şuanda başkası taradından kiralık durumdadır.")
            this.isCarRentedBySomeone = true;
          }

        }
        else{
          console.log("Araç daha önce hiç kiralanmamış!!")
        }
        
      })
  }

  isAuthenticated(){
    this.isAuth = this.authService.isAuthenticated();
   
  }


}
