import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NairobiWaterPaymentPage } from './nairobi-water-payment';

@NgModule({
  declarations: [
    NairobiWaterPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(NairobiWaterPaymentPage)
  ],
  exports: [
    NairobiWaterPaymentPage
  ]
})
export class NairobiWaterPaymentPageModule {}
