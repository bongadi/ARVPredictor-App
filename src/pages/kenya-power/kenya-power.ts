import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the KenyaPowerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kenya-power',
  templateUrl: 'kenya-power.html',
})
export class KenyaPowerPage {

  accounts: any;
  objectblock: any = {};
  data: any;
  private error: number = 0;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;
    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.accountTo = "";
    this.objectblock.billerName = "KPLC";

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
    }
    else if (this.objectblock.billerName == "" || this.objectblock.billerName == undefined) {
      this.error = 2;
    }
    else if (this.objectblock.accountTo == "" || this.objectblock.accountTo == undefined) {
      this.error = 3;
    }
    else if (this.objectblock.accountFrom == "" || this.objectblock.accountFrom == undefined) {
      this.error = 4;
    }
    else if (this.objectblock.accountTo.length < 10 || this.objectblock.accountTo.length > 15) {
      this.error = 5;
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
      content: 'Processing Bill payment request...'
    });

    loading.present();

    //send loan application request
    this.remoteService.postRequest(this.objectblock, "bill/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Bill payment", this.data.message.status);
          }
          else {
            this.globalVars.presentAlert("Bill payment Failed", this.data.message);

          }
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", "Bill payment not successful");
        }
      );
  }


}
