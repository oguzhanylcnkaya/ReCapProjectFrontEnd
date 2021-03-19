import { Component, OnInit } from '@angular/core';
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

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands()
      .subscribe((response) => {
        this.brands = response.data;
      });
  }

  setCurrentBrand(brand: Brand){
    this.currentBrand = brand;
    console.log(this.currentBrand);
  }

  getCurrentBrand(brand: Brand){

    if(this.currentBrand === brand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllBrandsClass(){

    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    
    }
  }

}
