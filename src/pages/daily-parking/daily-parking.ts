import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the DailyParkingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-parking',
  templateUrl: 'daily-parking.html',
})
export class DailyParkingPage {
  accounts: any;
  data: any;
  private error: number;
  private objectblock: any = {};

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.accounts = this.globalVars.accounts;

    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.username = this.accounts[0];

    this.objectblock.phonenumber = this.globalVars.mwalletAccount;
    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountNumber = this.globalVars.mwalletAccount;
    this.objectblock.billerName = "DAILYPARKING";

    this.parkingFees();
  }

  ionViewDidLoad() {
  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  payForParking(page){
    this.navCtrl.push(page);
  }

  parkingFees() {

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

  postRequest() {


    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Processing Daily Parking Presentment Request...'
    });

    loading.present();

    //send airtime purchase request
    this.remoteService.postRequest(this.objectblock, "bills/dailyparking/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Daily Parking Presentment", this.data.message.status);
          }
          else {
            this.globalVars.presentAlert("Daily Parking Presentment Failed", this.data.message);

          }
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", "Daily Parking Presentment failed. Kindly check your details and try again.");
        }
      );
  }

}
