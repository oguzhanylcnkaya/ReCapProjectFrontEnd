import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  carDetail: Car;
  carImages: CarImage[] = [];
  carImageBasePath = "https://localhost:44306/images/";

  constructor(private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private carImageService: CarImageService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((param) => {
      if(param["carId"]){
        this.getCarDetailByCarId(param["carId"]);
      }

      this.getCarImageByCarId();
    });
  }

  getCarDetailByCarId(carId: number){
    this.carDetailService.getCarDetailByCarId(carId)
    .subscribe((response) => {
      this.carDetail = response.data[0];
      console.log(this.carDetail);
    });
  }


  getCarImageByCarId(){
    this.carImageService.getCarImageByCarId(this.activatedRoute.snapshot.params["carId"])
      .subscribe((response) => {
        this.carImages = response.data;
        console.log(this.carImages);
      });
  }

}
