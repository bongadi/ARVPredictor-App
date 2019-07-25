import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeasonalParkingPage } from './seasonal-parking';

@NgModule({
  declarations: [
    SeasonalParkingPage
  ],
  imports: [
    IonicPageModule.forChild(SeasonalParkingPage)
  ],
  exports: [
    SeasonalParkingPage
  ]
})
export class SeasonalParkingPageModule {}
