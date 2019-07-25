import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinChangePage } from './pin-change';

@NgModule({
  declarations: [
    PinChangePage
  ],
  imports: [
    IonicPageModule.forChild(PinChangePage)
  ],
  exports: [
    PinChangePage
  ]
})
export class PinChangePageModule {}
