import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseRentPage } from './house-rent';

@NgModule({
  declarations: [
    HouseRentPage
  ],
  imports: [
    IonicPageModule.forChild(HouseRentPage)
  ],
  exports: [
    HouseRentPage
  ]
})
export class HouseRentPageModule {}
