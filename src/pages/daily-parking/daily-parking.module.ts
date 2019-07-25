import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyParkingPage } from './daily-parking';

@NgModule({
  declarations: [
    DailyParkingPage
  ],
  imports: [
    IonicPageModule.forChild(DailyParkingPage)
  ],
  exports: [
    DailyParkingPage
  ]
})
export class DailyParkingPageModule {}
