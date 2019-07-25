import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the WalletToWalletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallet-to-wallet',
  templateUrl: 'wallet-to-wallet.html',
})
export class WalletToWalletPage {

  billers: any;
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;
  mobilemoney: any;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider,
              public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.billers = this.globalVars.mobilemoney;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];

    this.objectblock.isOtherNumber = "false";
    this.objectblock.billerName = this.billers[0];

  }

  ionViewDidLoad() {
  }


  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }


  submit() {

    this.error = 0;

    if (this.objectblock.amount == "" || this.objectblock.amount == undefined) {
      this.error = 1;
    } else if(this.globalVars.validatePhone(this.objectblock.accountTo) != 0) {
      this.error = this.globalVars.validatePhone(this.objectblock.accountTo);
    }
    else if (this.objectblock.accountFrom == "" || this.objectblock.accountFrom == undefined) {
      this.error = 3;
    }
    else if (this.objectblock.accountTo == this.accounts[0]) {
      this.error = 4;
    }
    else {

      let alert = this.alertCtrl.create({
        title: 'Stanford DRD',
        message: 'Are you sure you want to process this request?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {

              this.globalVars.backToMainPage();

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

  }

  postRequest() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Wallet Transfer request...'
    });

    loading.present();

    //send airtime purchase request
    this.remoteService.postRequest(this.objectblock, "ftown/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {

            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Wallet Transfer", this.data.message.status);
          }
          else {

            this.globalVars.presentAlert("Wallet Transfer Failed", this.data.message);

          }
        }
      )
      .catch(
        error => {

          loading.dismiss();

          this.globalVars.presentAlert("Wallet Transfer Error", "Wallet Transfer not successful");
        }
      );


  }

}
