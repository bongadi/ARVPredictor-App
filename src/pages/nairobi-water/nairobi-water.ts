import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";

/**
 * Generated class for the NairobiWaterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nairobi-water',
  templateUrl: 'nairobi-water.html',
})
export class NairobiWaterPage {
global: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider) {
  this.global = navParams.get('global');
  }

  ionViewDidLoad() {
  }

   backToMainPage(page){
    this.navCtrl.setRoot(page, {global: this.global});
  }

  payForWater(page){
    this.navCtrl.push(page, {global: this.global});
  }

}
