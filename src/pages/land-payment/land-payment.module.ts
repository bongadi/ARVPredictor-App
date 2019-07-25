import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandPaymentPage } from './land-payment';

@NgModule({
  declarations: [
    LandPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(LandPaymentPage)
  ],
  exports: [
    LandPaymentPage
  ]
})
export class LandPaymentPageModule {}
