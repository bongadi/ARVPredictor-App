import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanCommitPage } from './loan-commit';

@NgModule({
  declarations: [
    LoanCommitPage
  ],
  imports: [
    IonicPageModule.forChild(LoanCommitPage)
  ],
  exports: [
    LoanCommitPage
  ]
})
export class LoanCommitPageModule {}
