import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WalletStatementsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallet-statements',
  templateUrl: 'wallet-statements.html',
})
export class WalletStatementsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
