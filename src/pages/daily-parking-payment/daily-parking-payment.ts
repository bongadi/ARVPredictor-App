import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";

/**
 * Generated class for the DailyParkingPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-parking-payment',
  templateUrl: 'daily-parking-payment.html',
})
export class DailyParkingPaymentPage {
global: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider) {
  this.global = navParams.get('global');
  }

  ionViewDidLoad() {
  }


   backToMainPage(page){
    this.navCtrl.setRoot(page, {global: this.global});
  }

}
