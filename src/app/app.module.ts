import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HomeComponent } from './components/home/home.component';
import { SectionBackgroundComponent } from './components/section-background/section-background.component';
import { CarPageComponent } from './components/car-page/car-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
import { OperationClaimAddComponent } from './components/operation-claim-add/operation-claim-add.component';
import { OperationClaimUpdateComponent } from './components/operation-claim-update/operation-claim-update.component';
import { UserOperationClaimComponent } from './components/user-operation-claim/user-operation-claim.component';
import { UserOperationClaimAddComponent } from './components/user-operation-claim-add/user-operation-claim-add.component';
import { UserOperationClaimUpdateComponent } from './components/user-operation-claim-update/user-operation-claim-update.component';
import { RolFilterPipe } from './pipes/rol-filter.pipe';
import { UserRolFilterPipe } from './pipes/user-rol-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    CarFilterPipePipe,
    RentalAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    CartComponent,
    PaymentComponent,
    LoginComponent,
    UserDetailComponent,
    HomeComponent,
    SectionBackgroundComponent,
    CarPageComponent,
    FooterComponent,
    OperationClaimComponent,
    OperationClaimAddComponent,
    OperationClaimUpdateComponent,
    UserOperationClaimComponent,
    UserOperationClaimAddComponent,
    UserOperationClaimUpdateComponent,
    RolFilterPipe,
    UserRolFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass : "toast-bottom-right"
    }),
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
