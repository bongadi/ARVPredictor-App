import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiniStatementPage } from './mini-statement';

@NgModule({
  declarations: [
    MiniStatementPage
  ],
  imports: [
    IonicPageModule.forChild(MiniStatementPage)
  ],
  exports: [
    MiniStatementPage
  ]
})
export class MiniStatementPageModule {}
