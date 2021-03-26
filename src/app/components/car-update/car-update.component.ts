import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  brands : Brand[];
  colors : Color[];
  carId: number;

  constructor(private carService:CarService,
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();

    this.activatedRoute.params
      .subscribe((param) => {
        if(param["carId"]){
          this.carId = param["carId"];
        }
      })
  }

  createCarUpdateForm(){

    this.carUpdateForm = this.formBuilder.group({
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      carName: ["", Validators.required]
    });

  }

  getBrands(){
    this.brandService.getBrands()
      .subscribe((response) => {
        this.brands = response.data;
      })
  }

  getColors(){
    this.colorService.getColors()
      .subscribe((response) => {
        this.colors = response.data;
      })
  }

  carUpdate(){
    
    if(this.carUpdateForm.valid){

      let carUpdateModel = Object.assign({}, this.carUpdateForm.value);

      carUpdateModel.id = this.carId;

      if(typeof(carUpdateModel.brandId) == "string"){
        carUpdateModel.brandId = parseInt(carUpdateModel.brandId);
      }

      if(typeof(carUpdateModel.colorId) == "string"){
        carUpdateModel.colorId = parseInt(carUpdateModel.colorId);
      }

      if(typeof(carUpdateModel.id) == "string"){
        carUpdateModel.id = parseInt(carUpdateModel.id);
      }

      this.carService.updateCar(carUpdateModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!!")
        }, responseError => {
          console.log(responseError);

          if(responseError.error.Errors.length > 0){

            for (let i = 0; i < responseError.error.Errors.length; i++) {
              
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata!!")
              
            }

          }
        })

    }
  }

}
