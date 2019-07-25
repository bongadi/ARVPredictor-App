import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the MiscelleanousPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-miscelleanous-payment',
  templateUrl: 'miscelleanous-payment.html',
})
export class MiscelleanousPaymentPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;
  private miscellaneousPresentment : any;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {


    this.accounts = this.globalVars.accounts;
    this.miscellaneousPresentment = this.globalVars.miscellaneousPresentment;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.billerName = "Miscellaneous";
    this.objectblock.transactionID = this.miscellaneousPresentment.TransactionID;
    this.objectblock.amount = this.miscellaneousPresentment.Amount;

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
      content: 'Sending Miscelleanous Payment request...'
    });

    loading.present();

    //sending pay miscellaneous request
    this.remoteService.postRequest(this.objectblock, "bills/misc/pay")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Miscelleanous Payment Successful", this.data.message.status);

            this.navCtrl.setRoot('MainPage');
          }
          else {
            this.globalVars.presentAlert("Miscelleanous Payment Failed", this.data.message.status);
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
