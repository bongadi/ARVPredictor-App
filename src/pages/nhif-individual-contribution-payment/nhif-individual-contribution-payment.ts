import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the NhifIndividualContributionPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nhif-individual-contribution-payment',
  templateUrl: 'nhif-individual-contribution-payment.html',
})
export class NhifIndividualContributionPaymentPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;
  nhifPresentment: any;

  constructor(public navCtrl: NavController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public globalVars: GlobalVarsProvider) {

    this.accounts = this.globalVars.accounts;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.billerName = "NHIF";

    this.nhifPresentment = this.globalVars.nhifPresentment;

    this.objectblock.memberCode = this.nhifPresentment.AccountNumber;
    this.objectblock.amount = this.nhifPresentment.Amount;
    this.objectblock.transactionID = this.nhifPresentment.TransactionID;

  }

  ionViewDidLoad() {
  }

   backToMainPage(page){
    this.navCtrl.setRoot(page);
  }


  submit() {

    let alert = this.alertCtrl.create({
      title: 'Stanford DRD',
      message: 'Do you wish to send this request?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {

            //PROCESS THE TRANSACTION
            this.postRequest();
          }
        }
      ]
    });
    alert.present();

  }

  postRequest () {


    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending NHIF Payment request...'
    });

    loading.present();

    //sending pay NHIF request
    this.remoteService.postRequest(this.objectblock, "bills/nhif/pay")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("NHIF Payment Successful", this.data.message.status);

            this.navCtrl.setRoot('MainPage');
          }
          else {
            this.globalVars.presentAlert("NHIF Payment Failed", this.data.message);
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
