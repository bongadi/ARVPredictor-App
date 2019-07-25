import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NhifIndividualContributionPaymentPage } from './nhif-individual-contribution-payment';

@NgModule({
  declarations: [
    NhifIndividualContributionPaymentPage
  ],
  imports: [
    IonicPageModule.forChild(NhifIndividualContributionPaymentPage)
  ],
  exports: [
    NhifIndividualContributionPaymentPage
  ]
})
export class NhifIndividualContributionPaymentPageModule {}
