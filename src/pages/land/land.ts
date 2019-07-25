import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the LandPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-land',
  templateUrl: 'land.html',
})
export class LandPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;

  constructor(public navCtrl: NavController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public globalVars: GlobalVarsProvider) {

    this.accounts = this.globalVars.accounts;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.billerName = "LANDRATE";
    this.objectblock.plotNumber = '';

  }

  ionViewDidLoad() {
  }

   backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  payForLand(page){
    this.navCtrl.push(page);
  }

  getLandRatesPresentment() {

    this.objectblock.stage = 'presentment';

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Fetching Land Rates Bill...'
    });

    loading.present();

    //fetch Land rates Bill request
    this.remoteService.postRequest(this.objectblock, "bills/landrates/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Land Rates Bill Successful", this.data.message.status);

            this.globalVars.landratesPresentment = this.data.message.landrates;
            this.openPage("LandPaymentPage");

          }
          else {
            this.globalVars.presentAlert("Land Rates Bill Failed", this.data.message);
          }
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", error);
        }
      );

  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
