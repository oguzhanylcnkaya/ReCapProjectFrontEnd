import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  currentBrand: Brand;

  brands: Brand[] = [];
  filterBrand = "";

  brand:Brand;

  constructor(private brandService: BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands()
      .subscribe((response) => {
        this.brands = response.data;
      });
  }

  getBrandId(id:number){
    return this.brandService.getBrandId(id);
  }

  deleteBrand(id:number){

    this.getBrandId(id)
      .subscribe((response) => {
        this.brand = response.data;

        this.brandService.deleteBrand(this.brand)
          .subscribe((response) => {
            this.toastrService.success(response.message, "Marka Silindi");
            this.ngOnInit();
          })
      })
    
  }
}
