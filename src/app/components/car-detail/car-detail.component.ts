import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { User } from 'src/app/models/user';
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

  carImages: CarImage[] = [];
  carImageBasePath = "https://localhost:44306/images/";

  showCarAvail: boolean;

  showFindexAvail:boolean = false;

  showAlert:boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private carImageService: CarImageService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private userService:UserService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((param) => {
      if(param["carId"]){
        this.getCarDetailByCarId(param["carId"]);
        this.isCarAvailable(param["carId"]);
      }

      this.getCarImageByCarId();
      this.getUser();

    });
  }

  getCarDetailByCarId(carId: number){
    this.carDetailService.getCarDetailByCarId(carId)
    .subscribe((response) => {
      this.carDetail = response.data[0];
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

}
