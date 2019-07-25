import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KenyaPowerPage } from './kenya-power';

@NgModule({
  declarations: [
    KenyaPowerPage
  ],
  imports: [
    IonicPageModule.forChild(KenyaPowerPage)
  ],
  exports: [
    KenyaPowerPage
  ]
})
export class KenyaPowerPageModule {}
