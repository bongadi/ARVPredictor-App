import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceInquiryPage } from './balance-inquiry';

@NgModule({
  declarations: [
    BalanceInquiryPage
  ],
  imports: [
    IonicPageModule.forChild(BalanceInquiryPage)
  ],
  exports: [
    BalanceInquiryPage
  ]
})
export class BalanceInquiryPageModule {}
