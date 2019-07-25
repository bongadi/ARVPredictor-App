import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundsTransferPage } from './funds-transfer';

@NgModule({
  declarations: [
    FundsTransferPage
  ],
  imports: [
    IonicPageModule.forChild(FundsTransferPage)
  ],
  exports: [
    FundsTransferPage
  ]
})
export class FundsTransferPageModule {}
