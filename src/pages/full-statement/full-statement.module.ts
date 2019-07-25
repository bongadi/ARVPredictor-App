import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullStatementPage } from './full-statement';

@NgModule({
  declarations: [
    FullStatementPage
  ],
  imports: [
    IonicPageModule.forChild(FullStatementPage)
  ],
  exports: [
    FullStatementPage
  ]
})
export class FullStatementPageModule {}
