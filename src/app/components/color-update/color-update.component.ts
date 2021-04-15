import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.scss']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  colorId:number;
  color:Color;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createColorUpdateForm();

    this.activatedRoute.params
      .subscribe((param) => {
        if(param["colorId"]){
          this.colorId = param["colorId"]
          this.getColorById(param["colorId"])
        }
      })
  }

  createColorUpdateForm(){

    this.colorUpdateForm = this.formBuilder.group({
      name : ["", Validators.required]
    });

  }

  updateBrand(){

    if(this.colorUpdateForm.valid){

      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      colorModel.id = this.colorId;

      if(typeof(colorModel.id) == "string"){
        colorModel.id = parseInt(colorModel.id);
      }

      this.colorService.updateColor(colorModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!");
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

  getColorById(id:number){
    this.colorService.getColorById(id)
      .subscribe((response) => {
        this.color = response.data;
      })
  }
}
