import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the AirtimePurchasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-airtime-purchase',
  templateUrl: 'airtime-purchase.html',
})
export class AirtimePurchasePage {
  telcos: any;
  accounts: any;
  data: any;
  objectblock: any = {};

  error: number = 0;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.telcos = this.globalVars.telcos;

    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.billerName = this.telcos[0];
    this.objectblock.isOtherNumber = "false";
    this.objectblock.phonenumber = this.globalVars.validateNumber(this.globalVars.mwalletAccount);
    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.contactObject = {};
  }

  ionViewDidLoad() {
  }

  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  pickContact() {
    this.globalVars.pickContacts().then(contact => {

      //if a Phone number has been picked successfully
      this.objectblock.contactObject = contact;
      this.objectblock.phonenumber = this.objectblock.contactObject.phone;
      this.objectblock.contactName = this.objectblock.contactObject.name;

    }).catch(error => {
      this.globalVars.presentAlert("Stanford DRD", error);

    });
  }

  submit() {

    this.error = 0;

    if (this.objectblock.amount == "" || this.objectblock.amount == undefined) {
      this.error = 1;
    }
    else if (this.objectblock.billerName == "" || this.objectblock.billerName == undefined) {
      this.error = 2;
    }
    else if (this.objectblock.isOtherNumber == "" || this.objectblock.isOtherNumber == undefined) {
      this.error = 3;
    }
    else if (this.objectblock.accountFrom == "" || this.objectblock.accountFrom == undefined) {
      this.error = 4;
    }else if(this.globalVars.validatePhone(this.objectblock.phonenumber) != 0) {
      this.error = this.globalVars.validatePhone(this.objectblock.phonenumber);
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
      content: 'Processing Airtime Request...'
    });

    loading.present();

    //send airtime purchase request
    this.remoteService.postRequest(this.objectblock, "airtime/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Airtime purchase", this.data.message.status);
          }
          else {
            this.globalVars.presentAlert("Airtime purchase Failed", this.data.message);

          }
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", "Airtime purchase failed. Kindly check your details and try again.");
        }
      );
  }


}
