export interface User{
    firstName:string;
    lastName:string;
    email:string;
    id:number;
    passwordHash: string;
    passwordSalt:string;
    status:boolean;

    customerFindexPoint:number;
}