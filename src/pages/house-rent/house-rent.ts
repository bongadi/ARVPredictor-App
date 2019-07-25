import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the HouseRentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-house-rent',
  templateUrl: 'house-rent.html',
})
export class HouseRentPage {
  error: number = 0;

  accounts: any;
  objectblock: any = {};
  data: any;

  private estates: any = [];
  private residences: any = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController, public globalVars: GlobalVarsProvider) {

    this.accounts = this.globalVars.accounts;

    this.objectblock.username = this.globalVars.mwalletAccount;
    this.objectblock.accountFrom = this.accounts[0];
    this.objectblock.phoneNumber = this.globalVars.mwalletAccount;
    this.objectblock.billerName = "HOUSERENT";
    this.objectblock.estate = '';
    this.objectblock.residence = '';
    this.objectblock.residenceNumber = '';
    this.objectblock.houseTypeID = '';

    //preserve estates if fetched earlier
    if (this.globalVars.estates.length > 0) {
      this.estates = this.globalVars.estates;
      this.objectblock.estate = this.estates[0];
    }
    else {
      this.getstates();
    }

  }

  onSelectEstate($event) {
    this.getResidences()
  }

  ionViewDidLoad() {
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  getstates() {

    this.objectblock.stage = 'estates';

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Fetching estates...'
    });

    loading.present();

    //fetch estates request
    this.remoteService.postRequest(this.objectblock, "bills/rent/show")
      .then(
        data => {

          //do not hide loader here as we have some more processes pending
          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Success", this.data.message.status);

            this.globalVars.estates = this.data.message.estates;
            this.estates = this.globalVars.estates;
            this.objectblock.estate = this.estates[0];
          }
          else {
            this.globalVars.backToMainPage();
            this.globalVars.presentAlert("Failed", this.data.message);
            this.navCtrl.pop();

          }
          //hide loader when long processes have executed
          loading.dismiss();
        }
      )
      .catch(
        error => {
          loading.dismiss();
          this.globalVars.backToMainPage();

          this.globalVars.presentAlert("Error", error);
        }
      );

  }


  getResidences() {

    this.objectblock.stage = 'residence';

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Fetching residences...'
    });

    loading.present();

    //fetch residence request
    this.remoteService.postRequest(this.objectblock, "bills/rent/residence")
      .then(
        data => {

          //do not hide loader here as we have some more processes pending
          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Success", this.data.message.status);

            this.globalVars.residences = this.data.message.residences;
            this.residences = this.globalVars.residences;
            this.objectblock.residence = this.residences[0];

          }
          else {
            this.globalVars.presentAlert("Failed", this.data.message.status);
          }
          //hide loader when long processes have executed
          loading.dismiss();
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", error);
        }
      );

  }


  getRentPresentment() {

    this.objectblock.stage = 'presentment';
    this.objectblock.houseTypeID = this.objectblock.residence.HouseTypeID;
    this.objectblock.residenceNumber = this.objectblock.residence.ID;

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Fetching Rent Bill...'
    });

    loading.present();

    //fetch residence request
    this.remoteService.postRequest(this.objectblock, "bills/rent/presentment")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.presentAlert("Success", this.data.message.status);

            this.globalVars.rentPresentment = this.data.message;
            this.openPage("RentPaymentPage");
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

