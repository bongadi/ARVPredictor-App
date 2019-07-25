import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocatePage } from './locate';

@NgModule({
  declarations: [
    LocatePage
  ],
  imports: [
    IonicPageModule.forChild(LocatePage)
  ],
  exports: [
    LocatePage
  ]
})
export class LocatePageModule {}
