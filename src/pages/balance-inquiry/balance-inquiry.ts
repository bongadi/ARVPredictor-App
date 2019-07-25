
import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the BalanceInquiryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-balance-inquiry',
  templateUrl: 'balance-inquiry.html',
})
export class BalanceInquiryPage {

accounts:any;
objectblock: any = {};
data:any;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.objectblock.accountnumber = this.accounts[0];
    this.objectblock.username = this.globalVars.mwalletAccount;

  }

  ionViewDidLoad() {
  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  updateBalanceAccount($event) {

  }

  submit() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Requesting account balance...'
    });

    loading.present();

    //send balance enquiry request
    this.remoteService.postRequest(this.objectblock, "enquiries/show")
      .then(
        data => {

          loading.dismiss();
          this.data=data;
          if(!this.data.error) {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Stanford DRD",
              "Available Balance: Kes " + GlobalVarsProvider.formatCurrency(this.data.message.available) + " <br/>" +
              "Actual Balance: Kes " + GlobalVarsProvider.formatCurrency(this.data.message.actual));

          }
          else {
            this.globalVars.presentAlert("Stanford DRD", this.data.message);

          }
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", this.data.message);
        }
      );
  }

}
