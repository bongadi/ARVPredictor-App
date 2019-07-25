import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentResidencesPage } from './rent-residences';

@NgModule({
  declarations: [
    RentResidencesPage
  ],
  imports: [
    IonicPageModule.forChild(RentResidencesPage)
  ],
  exports: [
    RentResidencesPage
  ]
})
export class RentResidencesPageModule {}
