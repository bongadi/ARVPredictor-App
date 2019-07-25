import { Component } from '@angular/core';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { Keyboard } from '@ionic-native/keyboard';

import {IonicPage, LoadingController, NavController, NavParams, AlertController} from 'ionic-angular';

import {RemoteServiceProvider} from '../../providers/remote-service/remote-service';
/**
 * Generated class for the BalancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {
  objectblock:any={};
  accounts:any=[];
  valueforngif:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider,
   public keyboard: Keyboard, public loadingCtrl: LoadingController,
  public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {
    this.accounts=globalVars.accounts;
    this.objectblock.account=this.accounts[0];
  }

  ionViewDidLoad() {
    this.keyboard.onKeyboardShow().subscribe(()=>{this.valueforngif=false});
    this.keyboard.onKeyboardHide().subscribe(()=>{this.valueforngif=true});

  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  submit(objectblock) {

    objectblock.interest = '';
    objectblock.customerName = '';

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Loan Balance request...'
    });

    loading.present();

    //send self registration request
    this.remoteService.postRequest(objectblock, "loan_balance.php", true)
      .then(
        data => {
          loading.dismiss();

          if(data['status'] ) {
            this.presentAlert("Failed",  data['message']);

          }
          else {
            //this.presentAlert("Success", data['message']);
            this.presentAlert("Failed",  data['message']);

          }


        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.presentAlert("Error", "Loan Balance checking not successful");
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
