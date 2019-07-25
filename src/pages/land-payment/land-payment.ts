import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the LandPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-land-payment',
  templateUrl: 'land-payment.html',
})
export class LandPaymentPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;
  private landratesPresentment: any;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.landratesPresentment = this.globalVars.landratesPresentment;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.billerName = "LANDRATE";
    this.objectblock.billerNumber = this.landratesPresentment.RateNumber;
    this.objectblock.transactionID = this.landratesPresentment.TransactionID;
    this.objectblock.amount = this.landratesPresentment.AmountToPay;

  }

  ionViewDidLoad() {
  }

   backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  submit() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Land Rate Payment request...'
    });

    loading.present();

    //sending pay landrate request
    this.remoteService.postRequest(this.objectblock, "bills/landrates/pay")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert(" Land Rate Payment Successful", this.data.message.status);

            this.navCtrl.setRoot('MainPage');
          }
          else {
            this.globalVars.presentAlert(" Land Rate Payment Failed", this.data.message.status);
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

}
