import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the NhifIndividualContributionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-nhif-individual-contribution',
  templateUrl: 'nhif-individual-contribution.html',
})
export class NhifIndividualContributionPage {
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
    this.objectblock.billerName = "NHIF";
    this.objectblock.isCorporate = "false";
    this.objectblock.amount = 0;

  }

  ionViewDidLoad() {
  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  getNHIFPresentment() {

      this.error = 0;

      if (this.objectblock.amount == "" || this.objectblock.amount == undefined) {
        this.error = 2;
      }
      else if (this.objectblock.accountNumber == "" || this.objectblock.accountNumber == undefined
        ||this.objectblock.accountNumber.length < 7 || this.objectblock.accountNumber.length > 15 ) {
        this.error = 1;
      }
      else {
        this.objectblock.stage = 'presentment';

        let loading = this.loadingCtrl.create({
          spinner: 'crescent',
          content: 'Fetching NHIF Bill...'
        });

        loading.present();

        //fetch NHIF Bill request
        this.remoteService.postRequest(this.objectblock, "bills/nhif/show")
          .then(
            data => {

              loading.dismiss();

              this.data = data;

              if (this.data.error === false) {
                this.globalVars.presentAlert("NHIF Bill Successful", this.data.message.status);

                this.globalVars.nhifPresentment = this.data.message.nhif;
                this.openPage("NhifIndividualContributionPaymentPage");

              }
              else {
                this.globalVars.presentAlert("NHIF Bill Failed", this.data.message);
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

  openPage(page){
    this.navCtrl.push(page);
  }

}
