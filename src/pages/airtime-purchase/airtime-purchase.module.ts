import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirtimePurchasePage } from './airtime-purchase';

@NgModule({
  declarations: [
    AirtimePurchasePage
  ],
  imports: [
    IonicPageModule.forChild(AirtimePurchasePage)
  ],
  exports: [
    AirtimePurchasePage
  ]
})
export class AirtimePurchasePageModule {}
