import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyParkingPaymentPage } from './daily-parking-payment';

@NgModule({
  declarations: [
    DailyParkingPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(DailyParkingPaymentPage)
  ],
  exports: [
    DailyParkingPaymentPage
  ]
})
export class DailyParkingPaymentPageModule {}
