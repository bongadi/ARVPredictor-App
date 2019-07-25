import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanBalancePage } from './loan-balance';

@NgModule({
  declarations: [
    LoanBalancePage
  ],
  imports: [
    IonicPageModule.forChild(LoanBalancePage)
  ],
  exports: [
    LoanBalancePage
  ]
})
export class LoanBalancePageModule {}
