import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';

const routes: Routes = [
  {path: "", pathMatch : 'full', component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/brand/:brandId", component: CarComponent},
  {path: "cars/color/:colorId", component: CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  
  {path: "cars/detail/:carId", component: CarDetailComponent},

  {path: "rental/add/:carId", component: RentalAddComponent},
  {path: "brand/add", component: BrandAddComponent},
  {path: "color/add", component: ColorAddComponent},
  {path: "car/add", component: CarAddComponent},
  {path: "cars/update/:carId", component:CarUpdateComponent},
  {path: "brand/update/:brandId", component: BrandUpdateComponent},
  {path: "color/update/:colorId", component: ColorUpdateComponent},
  {path: "cart", component: CartComponent},
  {path: "payment", component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
