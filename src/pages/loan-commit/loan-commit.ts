import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the LoanCommitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loan-commit',
  templateUrl: 'loan-commit.html',
})
export class LoanCommitPage {
  error: number = 0;

  accounts: any;
  loanScore: any;
  objectblock: any = {};
  data: any;

  formatCurrency = GlobalVarsProvider.formatCurrency;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.loanScore = this.globalVars.loanScore;


    //this.objectblock.tillno = this.globalVars.tills;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.username = this.globalVars.mwalletAccount;

  }

  ionViewDidLoad() {
  }

  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  evaluateLoanRequirements() {

    //evaluate loan requirement

    //If you are trying to borrow less than your minimum score
    if (this.objectblock.amount == undefined || this.objectblock.amount == "") {

      this.error = 1;
    }

    //If you are trying to borrow less than your minimum score
    else if (parseFloat(this.objectblock.amount) < parseFloat(this.loanScore.minimumAmount)) {

      this.error = 1;
    }

    //If you are trying to borrow more than your maximum score
    else if (parseFloat(this.objectblock.amount) > parseFloat(this.loanScore.maximumAmount)) {

      this.error = 2;
    }

    //If you are trying to borrow less that the minium amount disbursal amount
    else if (parseFloat(this.objectblock.amount) < (parseFloat((this.loanScore.loanBalance) + parseFloat(this.loanScore.netDisbursement)) )) {

      this.error = 3;
    }

    //Everything is e super-duper fly, please send my loan request
    else {

      this.error = 0;

      this.selectPaymentMethod();

    }

  }

  selectPaymentMethod() {

    this.objectblock.disbursementMethod = '';

    let alert = this.alertCtrl.create({
      title: 'Stanford DRD',
      message: "Please choose where you'd like to receive the money.",
      buttons: [
        {
          text: 'Cancel Loan Request',
          role: 'cancel',
          handler: () => {
            this.globalVars.backToMainPage();

          }
        },
        {
          text: 'M-Pesa',
          handler: () => {
            this.objectblock.disbursementMethod = 'MPESA';

            //PROCESS THE TRANSACTION
            this.submit();
          }
        },
        {
          text: 'My-Wallet',
          handler: () => {
            this.objectblock.disbursementMethod = 'WALLET';

            //PROCESS THE TRANSACTION
            this.submit();
          }
        }
      ]
    });
    alert.present();

  }

  submit() {

    let alert = this.alertCtrl.create({
      title: 'Stanford DRD',
      message: "You are about to apply for a " + this.loanScore.loanName + " loan of KES. " + this.formatCurrency(this.objectblock.amount) + " from Stanford DRD. ",
      buttons: [
        {
          text: 'Cancel Loan Request',
          role: 'cancel',
          handler: () => {
            this.globalVars.backToMainPage();

          }
        },
        {
          text: 'Accept Loan',
          handler: () => {

            //PROCESS THE TRANSACTION
            this.postRequest();
          }
        }
      ]
    });
    alert.present();

  }

  postRequest() {

    this.objectblock.term = this.loanScore.term;

    //not necessary for Salary advance
    this.objectblock.interest = this.loanScore.interest;
    this.objectblock.loanname = this.loanScore.loanName;

    this.objectblock.tillno = this.loanScore.tillno;
    this.objectblock.loanproduct = this.loanScore.loanProductCode;
    this.objectblock.loanTopup = this.loanScore.loanType;
    this.objectblock.FINProcessed = this.loanScore.FINProcessed;

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Loan application request...'
    });

    loading.present();

    //send loan application request
    this.remoteService.postRequest(this.objectblock, "loans/apply/show")
      .then(
        data => {
          loading.dismiss();
          this.data = data;

          if (this.data.error === false) {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Stanford DRD", "Loan Application is successful. Your account has been credited.");

          }
          else {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Stanford DRD", this.data.message);

          }

        }
      )
      .catch(
        error => {
          loading.dismiss();
          this.globalVars.presentAlert("Error", "Loan Application not successful. \n Kindly check your details and try again");
        }
      );

  }

}
