import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletStatementsPage } from './wallet-statements';

@NgModule({
  declarations: [
    WalletStatementsPage
  ],
  imports: [
    IonicPageModule.forChild(WalletStatementsPage)
  ],
  exports: [
    WalletStatementsPage
  ]
})
export class WalletStatementsPageModule {}
