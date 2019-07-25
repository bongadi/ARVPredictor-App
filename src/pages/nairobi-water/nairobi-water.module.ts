import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NairobiWaterPage } from './nairobi-water';

@NgModule({
  declarations: [
    NairobiWaterPage
  ],
  imports: [
    IonicPageModule.forChild(NairobiWaterPage)
  ],
  exports: [
    NairobiWaterPage
  ]
})
export class NairobiWaterPageModule {}
