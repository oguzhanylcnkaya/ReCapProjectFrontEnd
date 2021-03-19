import { Component, OnInit } from '@angular/core';
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
  colorFilter="";

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors()
      .subscribe((response) => {
        this.colors = response.data;
      })
  }

  setCurrentColor(color: Color){
    this.currentColor = color;
  }

  getCurrentClass(color: Color){

    if(this.currentColor === color){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  getAllColorClass(){

    if(!this.currentColor){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

}
