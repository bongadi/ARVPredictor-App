import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";

/**
 * Generated class for the ChangePinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
  private error: number = 0;
  private objectblock: any = {};
  private data: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,  public globalVars: GlobalVarsProvider,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.objectblock.username = this.globalVars.mwalletAccount;
  }

  ionViewDidLoad() {
  }

  submit() {

    this.error = 0;

    if (this.objectblock.oldpass === "" || this.objectblock.oldpass == undefined) {
      this.error = 1;
    }
    else if (this.objectblock.newpass === "" || this.objectblock.newpass == undefined) {
      this.error = 2;
    }
    else if (this.objectblock.newpassconfirm === "" || this.objectblock.newpassconfirm == undefined) {
      this.error = 3;
    }
    else if (this.objectblock.newpassconfirm !== this.objectblock.newpass) {
      this.error = 4;
    }
    else {

      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Sending Change Pin request...'
      });

      loading.present();

      //send airtime purchase request
      this.remoteService.postRequest(this.objectblock, "pin/show")
        .then(
          data => {

            loading.dismiss();

            this.data = data;

            if(this.data.error === false) {

              this.navCtrl.setRoot('LoginPage');
              this.globalVars.logout();

              this.globalVars.presentAlert("Change Pin Successful", this.data.message.status);
            }
            else {
              this.globalVars.presentAlert(" Change Pin Failed", this.data.message.status);

            }
          }
        )
        .catch(
          error => {
            loading.dismiss();

            this.globalVars.presentAlert("Error", " Change Pin not successful");
          }
        );
    }

  }

}
