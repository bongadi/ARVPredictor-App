import {Component} from '@angular/core';
import {GlobalVarsProvider} from '../../providers/global-vars/global-vars';
import {Keyboard} from '@ionic-native/keyboard';

import {IonicPage, LoadingController, NavController, NavParams, AlertController} from 'ionic-angular';

import {RemoteServiceProvider} from '../../providers/remote-service/remote-service';


/**
 /**
 * Generated class for the ApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {
  objectblock: any = {};
  accounts: any = [];
  valueforngif: boolean = true;
  ltypes: any = [];
  periods: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider,
              public keyboard: Keyboard, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {
    this.accounts = globalVars.accounts;
    //this.accounts=["254702818290"];
    this.objectblock.account = this.accounts[0];
    //this.ltypes=["Stanford DRD STAFF","Consumer"];
    this.ltypes = this.globalVars.lTypes;
    this.periods = this.globalVars.lPeriods;
    //this.periods=["1 month","2 months","3 months","4 months","6 months","1 year"];
    this.objectblock.ltype = this.ltypes[0];
    this.objectblock.period = this.periods[0];
    this.objectblock.qamount = "70000";

  }

  ionViewDidLoad() {
    this.keyboard.onKeyboardShow().subscribe(() => {
      this.valueforngif = false
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      this.valueforngif = true
    });
  }

  viewAccounts() {

  }

  submit(objectblock) {

    objectblock.interest = '';
    objectblock.customerName = '';

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Loan request...'
    });

    loading.present();

    //send self registration request
    this.remoteService.postRequest(objectblock, "loans/apply/show")
      .then(
        data => {

          loading.dismiss();

          //this.presentAlert("Success", data['message']);
          this.presentAlert("Success", "Loan Application has been received. It will be processed shortly.");

        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.presentAlert("Error", "Loan Application not successful");
        }
      );

  }

  public presentAlert(title: string, message: string): any {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'Home',
          role: 'cancel',
          handler: () => {
            this.navCtrl.push('MainPage');
          }
        }
      ]
    });
    alert.present();
  }

}
