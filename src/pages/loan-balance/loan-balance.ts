import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the LoanBalancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loan-balance',
  templateUrl: 'loan-balance.html',
})
export class LoanBalancePage {
  error: number = 0;

  accounts: any;
  loanScore: any;
  objectblock: any = {};
  data: any;

  isNumeric = GlobalVarsProvider.isNumeric;

  private loanaccounts: any;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.loanaccounts = this.globalVars.loanaccounts;

    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.username = this.globalVars.mwalletAccount;

  }

  ionViewDidLoad() {
  }

  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  submit() {

    this.error = 0;

    if (this.objectblock.loanaccount == "" || this.objectblock.loanaccount == undefined) {
      this.error = 1;
    }
    else {

      let info = (GlobalVarsProvider.isNumeric(this.objectblock.loanaccount.loan_till) ) ? " for till " + this.objectblock.loanaccount.loan_till : "";

      let alert = this.alertCtrl.create({
        title: 'Stanford DRD',
        message: "Do you wish to check your loan balance for " + this.objectblock.loanaccount.loan_product_name + " " + info,
        buttons: [
          {
            text: 'Cancel Loan Balance Request',
            role: 'cancel',
            handler: () => {
              this.globalVars.backToMainPage();
            }
          },
          {
            text: 'Request Balance',
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

    this.globalVars.presentAlert("Stanford DRD", "Dear " + this.globalVars.customername + ", your loan account balance is " + this.objectblock.loanaccount.loan_outstanding);

  }
}
