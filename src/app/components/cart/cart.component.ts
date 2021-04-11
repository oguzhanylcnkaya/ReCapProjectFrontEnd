import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList : CartItem[];
  totalPrice: number;

  carImageBasePath = "https://localhost:44306/images/";

  constructor(private cartService: CartService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts(){
    
    this.cartList = this.cartService.cartList();

    // this.cartList += JSON.parse(this.localStorageService.getItem("rentalInfo")!);
    // console.log(this.cartList)

    this.cartService.data
      .subscribe((response) => {
        this.totalPrice = response.cartTotal;
      })
  }



}
