import { UserOperationClaim } from "./userOperationClaim";

export interface UserOperationClaimDetails extends UserOperationClaim{
    operationName : string;
    userFirstName : string;
    userLastName:string;
    userFullName:string;
    email:string;
}
