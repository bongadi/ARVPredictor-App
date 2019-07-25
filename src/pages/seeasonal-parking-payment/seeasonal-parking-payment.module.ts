import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeasonalParkingPaymentPage } from './seeasonal-parking-payment';

@NgModule({
  declarations: [
    SeeasonalParkingPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(SeeasonalParkingPaymentPage)
  ],
  exports: [
    SeeasonalParkingPaymentPage
  ]
})
export class SeeasonalParkingPaymentPageModule {}
