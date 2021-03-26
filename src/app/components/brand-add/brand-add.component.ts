import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  addBrand(){
    
    if(this.brandAddForm.valid){

      let brandModel = Object.assign({}, this.brandAddForm.value);

      this.brandService.addBrand(brandModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!!")
        }, responseError => {

          if(responseError.error.Errors.length > 0){

            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Hata!");
            }

          }
        });
    }
    else{
      this.toastrService.error("Lütfen ilgili yerleri doldurunuz!", "Hata!");
    }

  }

}
