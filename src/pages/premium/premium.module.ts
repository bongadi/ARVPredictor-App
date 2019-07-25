import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremiumPage } from './premium';

@NgModule({
  declarations: [
    PremiumPage
  ],
  imports: [
    IonicPageModule.forChild(PremiumPage)
  ],
  exports: [
    PremiumPage
  ]
})
export class PremiumPageModule {}
