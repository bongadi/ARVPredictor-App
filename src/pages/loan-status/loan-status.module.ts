import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanStatusPage } from './loan-status';

@NgModule({
  declarations: [
    LoanStatusPage
  ],
  imports: [
    IonicPageModule.forChild(LoanStatusPage)
  ],
  exports: [
    LoanStatusPage
  ]
})
export class LoanStatusPageModule {}
