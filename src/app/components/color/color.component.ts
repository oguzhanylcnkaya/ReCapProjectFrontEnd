import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  currentColor : Color;
  colors : Color[] = [];
  color:Color;

  colorFilter="";

  getColorId: number;

  constructor(private colorService: ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors()
      .subscribe((response) => {
        this.colors = response.data;
      })
  }

  getColorById(id:number){
    return this.colorService.getColorById(id);
  }

  // setCurrentColor(color: Color){
  //   this.currentColor = color;
  // }

  // getCurrentClass(color: Color){

  //   if(this.currentColor === color){
  //     return "list-group-item active";
  //   }
  //   else{
  //     return "list-group-item";
  //   }
  // }

  // getAllColorClass(){

  //   if(!this.currentColor){
  //     return "list-group-item active";
  //   }
  //   else{
  //     return "list-group-item";
  //   }
  // }

  deleteColor(id:number){

    this.getColorById(id)
      .subscribe((response) => {

        this.color = response.data;

        this.colorService.deleteColor(this.color)
          .subscribe((response) => {
            this.toastrService.success(response.message, "Renk Silindi!");
            this.ngOnInit();
          })
      })
  }

}
