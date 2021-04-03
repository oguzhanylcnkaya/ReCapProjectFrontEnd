export interface Payment{
    cartOwnerName:string;
    cardNumber:string;
    expirationDate:string;
    cardCvv:number;
    customerId:number;
    paymentDate:Date;
}