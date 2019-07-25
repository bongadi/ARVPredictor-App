import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountServicesPage } from './account-services';

@NgModule({
  declarations: [
    AccountServicesPage
  ],
  imports: [
    IonicPageModule.forChild(AccountServicesPage)
  ],
  exports: [
    AccountServicesPage
  ]
})
export class AccountServicesPageModule {}
