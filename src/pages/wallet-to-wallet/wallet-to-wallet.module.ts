import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletToWalletPage } from './wallet-to-wallet';

@NgModule({
  declarations: [
    WalletToWalletPage
  ],
  imports: [
    IonicPageModule.forChild(WalletToWalletPage)
  ],
  exports: [
    WalletToWalletPage
  ]
})
export class WalletToWalletPageModule {}
