import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarPageComponent } from './components/car-page/car-page.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OperationClaimAddComponent } from './components/operation-claim-add/operation-claim-add.component';
import { OperationClaimUpdateComponent } from './components/operation-claim-update/operation-claim-update.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
import { PaymentComponent } from './components/payment/payment.component';

import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: "", pathMatch : 'full', component: HomeComponent},
  {path: "cars", component: HomeComponent},
  {path: "cars/brand/:brandId", component: HomeComponent},
  {path: "cars/color/:colorId", component: HomeComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:HomeComponent},
  
  {path: "cars/detail/:carId", component: CarDetailComponent},

  {path: "rental/add/:carId", component: RentalAddComponent},
  {path: "brand/add", component: BrandAddComponent},
  {path: "color/add", component: ColorAddComponent},
  {path: "car/add", component: CarAddComponent, canActivate: [LoginGuard]},
  {path: "cars/update/:carId", component:CarUpdateComponent},
  {path: "brand/update/:brandId", component: BrandUpdateComponent},
  {path: "color/update/:colorId", component: ColorUpdateComponent},
  {path: "cart", component: CartComponent},
  {path: "payment", component: PaymentComponent},
  {path:"login", component:LoginComponent},
  {path: "profile", component: UserDetailComponent},

  {path: "car-page", component:CarPageComponent},
  {path: "car-page/brand/:brandId", component:CarPageComponent},
  {path: "car-page/color/:colorId", component:CarPageComponent},
  {path: "car-page/brand/:brandId/color/:colorId", component:CarPageComponent},

  {path: "brand", component:BrandComponent},
  {path: "color", component: ColorComponent},

  {path:"operationClaim", component:OperationClaimComponent},
  {path:"operationClaim/add", component:OperationClaimAddComponent},
  {path: "operationClaim/update/:id", component:OperationClaimUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
