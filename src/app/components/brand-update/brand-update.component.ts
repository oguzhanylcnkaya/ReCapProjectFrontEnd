import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.scss']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: FormGroup;
  brandId:number;

  brand:Brand;

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private activedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    
    this.activedRoute.params
    .subscribe((param) => {
      if(param["brandId"]){
        this.brandId = param["brandId"];
        this.getBrandById(param["brandId"])
      }
    })

    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){

    this.brandUpdateForm = this.formBuilder.group({
      name : ["", Validators.required]
    });

  }

  updateBrand(){

    if(this.brandUpdateForm.valid){

      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      brandModel.id = this.brandId;

      if(typeof(brandModel.id) == "string"){
        brandModel.id = parseInt(brandModel.id);
      }

      this.brandService.updateBrand(brandModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!")
        }, responseError => {

          if(responseError.error.Errors.length > 0){

            for (let i = 0; i < responseError.error.Errors.length; i++) {
              
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata!");
              
            }
          }

        })
    }
    else{
      this.toastrService.error("Lütfen ilgili yerleri doldurunuz.", "Hata!");
    }

  }

  getBrandById(id:number){
    this.brandService.getBrandId(id)
      .subscribe((response) => {
        this.brand = response.data;
      })
  }

}
