import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the MiscellaneousPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-miscellaneous',
  templateUrl: 'miscellaneous.html',
})
export class MiscellaneousPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController, public globalVars: GlobalVarsProvider) {

    this.accounts = this.globalVars.accounts;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.billerName = "Miscellaneous";
    this.objectblock.billNumber = "";

  }

  ionViewDidLoad() {
  }

   backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  getMiscellaneousPresentment() {

    this.objectblock.stage = 'presentment';

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Fetching Miscellaneous Bill...'
    });

    loading.present();

    //fetch NHIF Bill request
    this.remoteService.postRequest(this.objectblock, "bills/misc/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Miscellaneous Bill Successful", this.data.message.status);

            this.globalVars.miscellaneousPresentment = this.data.message.misc;
            this.openPage("MiscelleanousPaymentPage");

          }
          else {
            this.globalVars.presentAlert("Miscellaneous Bill Failed", this.data.message);
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
