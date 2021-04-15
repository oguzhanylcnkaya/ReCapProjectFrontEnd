import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-background',
  templateUrl: './section-background.component.html',
  styleUrls: ['./section-background.component.scss']
})
export class SectionBackgroundComponent implements OnInit {

  constructor() { }
  @Input() data: string;
  @Input() image:string;

  ngOnInit(): void {
    this.getImage()
  }

  getImage(){

    if(this.image == "" || this.image == null){
      this.image = "slider1.jpg";
    }
    
  }

}
