import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinchangePage } from './pinchange';

@NgModule({
  declarations: [
    PinchangePage
  ],
  imports: [
    IonicPageModule.forChild(PinchangePage)
  ],
  exports: [
    PinchangePage
  ]
})
export class PinchangePageModule {}
