import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NhifPage } from './nhif';

@NgModule({
  declarations: [
    NhifPage
  ],
  imports: [
    IonicPageModule.forChild(NhifPage)
  ],
  exports: [
    NhifPage
  ]
})
export class NhifPageModule {}
