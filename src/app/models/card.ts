export interface Card{
    id: number;
    customerId:number;
    cardOwnerName:string;
    cardNumber:string;
    cardExpirationDate:string;
    cardCvv:number;
}

export class CartTotal{
    customerId:number;
    cartTotal:number;
}