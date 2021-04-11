import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss']
})
export class CarAddComponent implements OnInit {

  brands: Brand[];

  colors: Color[];

  carAddForm: FormGroup;

  constructor(private brandService:BrandService,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.createCarAddForm();
  }

  getBrands(){
    this.brandService.getBrands()
      .subscribe((response) => {
        this.brands = response.data;
      });
  }

  getColors(){
    this.colorService.getColors()
      .subscribe((response) => {
        this.colors = response.data;
      })
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      carName: ["", Validators.required],
      carFindexPoint: [""]
    });
  }

  addCar(){

    if(this.carAddForm.valid){
      let carModel = Object.assign({}, this.carAddForm.value);

      if(typeof(carModel.brandId)== "string"){
        carModel.brandId = parseInt(carModel.brandId);
      }  

      if(typeof(carModel.colorId)== "string"){
        carModel.colorId = parseInt(carModel.colorId);
      } 

      carModel.carFindexPoint = Number(carModel.carFindexPoint);

      this.carService.addCar(carModel)
        .subscribe((response) => {
            this.toastrService.success(response.message, "Başarılı!")
        }, responseError => {
          console.log(responseError);

          if(responseError.error.Errors.length > 0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata!")
            }
          }
        })
      
    }
    else{
      this.toastrService.error("Lütfen ilgili alanları doldurunuz!", "Hata!")
    }

  }

}
