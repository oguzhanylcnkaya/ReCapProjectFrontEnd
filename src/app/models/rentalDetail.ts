import { Rental } from "./rental";

export interface RentalDetail extends Rental{
    brandName : string;
    fullName: string;
    rentDate:Date;
    returnDate:Date;
}