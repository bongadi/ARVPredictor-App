import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NhifIndividualContributionPage } from './nhif-individual-contribution';

@NgModule({
  declarations: [
    NhifIndividualContributionPage
  ],
  imports: [
    IonicPageModule.forChild(NhifIndividualContributionPage)
  ],
  exports: [
    NhifIndividualContributionPage
  ]
})
export class NhifIndividualContributionPageModule {}
