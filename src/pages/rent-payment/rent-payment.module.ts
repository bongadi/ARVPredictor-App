import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentPaymentPage } from './rent-payment';

@NgModule({
  declarations: [
    RentPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(RentPaymentPage)
  ],
  exports: [
    RentPaymentPage
  ]
})
export class RentPaymentPageModule {}
