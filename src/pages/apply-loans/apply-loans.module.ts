import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyLoansPage } from './apply-loans';

@NgModule({
  declarations: [
    ApplyLoansPage
  ],
  imports: [
    IonicPageModule.forChild(ApplyLoansPage)
  ],
  exports: [
    ApplyLoansPage
  ]
})
export class ApplyLoansPageModule {}
