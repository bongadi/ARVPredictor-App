import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstChangePinPage } from './first-change-pin';

@NgModule({
  declarations: [
    FirstChangePinPage
  ],
  imports: [
    IonicPageModule.forChild(FirstChangePinPage)
  ],
  exports: [
    FirstChangePinPage
  ]
})
export class FirstChangePinPageModule {}
