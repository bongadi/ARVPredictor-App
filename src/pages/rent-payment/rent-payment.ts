import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, LoadingController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the RentPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rent-payment',
  templateUrl: 'rent-payment.html',
})
export class RentPaymentPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;
  private rentpresentment: any = [];

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.rentpresentment = this.globalVars.rentPresentment;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.billerName = "HOUSERENT";
    this.objectblock.transactionID = this.rentpresentment.TransactionID;
    this.objectblock.amount = this.rentpresentment.Amount;

  }

  ionViewDidLoad() {
  }

  backToMainPage(page) {
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
      content: 'Sending Rent Payment request...'
    });

    loading.present();

    //sending pay rent request
    this.remoteService.postRequest(this.objectblock, "bills/rent/pay")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Rent Payment Successful", this.data.message.status);

            this.navCtrl.setRoot('MainPage');
          }
          else {
            this.globalVars.presentAlert("Failed", this.data.message.status);
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
