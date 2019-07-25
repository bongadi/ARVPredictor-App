import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanRepaymentPage } from './loan-repayment';
import {GrouppartialPipe} from "../../pipes/grouppartial/grouppartial";
import {BydrugclassPipe} from "../../pipes/bydrugclass/bydrugclass"; // this is needed!

@NgModule({
  declarations: [
    LoanRepaymentPage,
    GrouppartialPipe,
    BydrugclassPipe
  ],
  imports: [
    IonicPageModule.forChild(LoanRepaymentPage)
  ],
  exports: [
    LoanRepaymentPage
  ],
  providers: [GrouppartialPipe, BydrugclassPipe]
})
export class LoanRepaymentPageModule {}
