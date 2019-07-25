import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiscelleanousPaymentPage } from './miscelleanous-payment';

@NgModule({
  declarations: [
    MiscelleanousPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(MiscelleanousPaymentPage)
  ],
  exports: [
    MiscelleanousPaymentPage
  ]
})
export class MiscelleanousPaymentPageModule {}
