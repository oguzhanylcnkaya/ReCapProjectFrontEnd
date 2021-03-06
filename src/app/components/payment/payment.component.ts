import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CardService } from 'src/app/services/card.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentAddForm:FormGroup;
  cartTotal:number;
  customerId:number;
  cardId: number;
  saveCard:boolean = false;

  rentalInfo:Rental;

  cards: Card[];

  user:User;

  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private cartService:CartService,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private cardService:CardService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    this.customerId = Number(this.localStorageService.getItem("userId"));
    this.userService.getUserById(this.customerId)
      .subscribe((response) => {
        this.user = response.data;
        
      });

    this.cartService.data
      .subscribe((response) => {
          this.cartTotal = response.cartTotal;
          // this.customerId = response.customerId;
      })
      
    this.createPaymentAddForm();
    this.getCardList();
    this.getRental();

  }

  createPaymentAddForm(){
    this.paymentAddForm = this.formBuilder.group({
      cardOwnerName:["",Validators.required],
      cardNumber: ["",Validators.required],
      cardExpirationDate :["", Validators.required],
      cardCvv:["",Validators.required],
      saveCard:[false]
    })
  }

  addPayment(){

    if(this.paymentAddForm.valid){

      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      paymentModel.customerId = this.customerId;
      paymentModel.total = this.cartTotal;
      paymentModel.cardId = this.customerId + this.cartTotal;
      paymentModel.paymentDate = new Date().toISOString().slice(0,10);
      this.saveCard = paymentModel.saveCard;
      if(typeof(paymentModel.cardId) === "string"){
        paymentModel.cardId = parseInt(paymentModel.cardId);
      }
      if(typeof(paymentModel.customerId) === "string"){
        paymentModel.customerId = parseInt(paymentModel.customerId);
      }

      console.log(this.saveCard);

      this.paymentService.payment(paymentModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Ba??ar??l?? ??deme!");

          if(this.saveCard){
            this.addCart();
          }

          this.plusUserFindexPoint();

          this.rentalService.rentalAdd(this.rentalInfo)
          .subscribe((resp) => {
            this.toastrService.info(resp.message, "Arac?? Kiralad??n??z!");
            this.router.navigate(["/"]);
          }, respError => {
            console.log(respError)
          })

        }, responseError => {
          this.toastrService.error("????lem ger??ekle??emedi", "Hatal?? ??deme")
        })

       
    }
    else{
      this.toastrService.error("L??tfen t??m alanlar?? doldurunuz!", "Bo?? Alan Var!")
    }

  }

  addCart(){
    if(this.paymentAddForm.valid){
      let cardModel = this.paymentAddForm.value;
      cardModel.cardCvv = parseInt(cardModel.cardCvv);

      // var csId = (this.localStorageService.getItem("userId"));
      cardModel.customerId = Number(this.customerId);

      this.cardService.addCard(cardModel)
        .subscribe((response) => {
          this.toastrService.success("Kart Bilgileri Eklendi", "Ba??ar??l??");
        }, responseError => {
          this.toastrService.error("Kart Bilgileri Eklenirken Bir Sorun Olu??tu", "Hata!")
        })
    }
  }

  setCurrentCard(card:Card){
    this.paymentAddForm.setValue({
      cardOwnerName : card.cardOwnerName,
      cardNumber : card.cardNumber,
      cardExpirationDate : card.cardExpirationDate,
      cardCvv : card.cardCvv,
      saveCard : false,
    })
    this.cardId = card.id
  }

  getCardList() {
    this.cardService.getByCustomerId(this.customerId)
      .subscribe((response) => {
        console.log(response);

        this.cards = response.data;
      })
  }

  getRental(){
    this.rentalInfo = this.rentalService.getRental();

    console.log(this.rentalInfo.carId);
    console.log(typeof(this.rentalInfo.carId));

    if(typeof(this.rentalInfo.customerId) == "string"){
      this.rentalInfo.customerId = parseInt(this.rentalInfo.customerId);
    }

    if(typeof(this.rentalInfo.rentDate) == "string"){
      this.rentalInfo.rentDate = new Date(this.rentalInfo.rentDate);
    }

    if(typeof(this.rentalInfo.returnDate) == "string"){
      this.rentalInfo.returnDate = new Date(this.rentalInfo.returnDate);
    }

  }

  plusUserFindexPoint(){
    if(Number(this.user.customerFindexPoint) < 1900){

      this.user = {
        email : this.user.email,
        id : this.user.id,
        firstName : this.user.firstName,
        lastName : this.user.lastName,
        status : this.user.status,
        passwordHash : this.user.passwordHash,
        passwordSalt : this.user.passwordSalt,
        customerFindexPoint : Number(this.user.customerFindexPoint) + 100
      }

      this.userService.updateUser(this.user)
        .subscribe((response) => {
          this.toastrService.success("Arac?? ba??ar??yla kiralad??????n??z i??in 100 art?? findex puan kazand??n??z!")
        })

    }
  }

}
