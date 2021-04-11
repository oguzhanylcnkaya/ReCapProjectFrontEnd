import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ReCapProjectFrontEnd';

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {


  }

}
