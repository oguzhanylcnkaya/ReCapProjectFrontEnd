import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.scss']
})
export class RentalAddComponent implements OnInit {

  rental: Rental;
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
  }

  rentalAdd(rental:Rental){
    this.rentalService.rentalAdd(rental)
      .subscribe((response) => {
        
      });
  }
}
