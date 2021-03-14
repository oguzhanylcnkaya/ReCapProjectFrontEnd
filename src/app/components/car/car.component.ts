import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCarsDetails();
  }

  getCarsDetails(){
    this.carService.getCarsDetails()
      .subscribe(response => {
        this.cars = response.data;
      });
  }

}
