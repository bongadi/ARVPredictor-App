import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the MiniStatementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mini-statement',
  templateUrl: 'mini-statement.html',
})
export class MiniStatementPage {
  data: any;

  accounts:any;
  objectblock: any = {};
  ministatement: any = [];

  hideheader: boolean = true;

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider,
              public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider) {

    this.accounts = this.globalVars.accounts;
    this.objectblock.accountnumber = this.accounts[0];

  }

  ionViewDidLoad() {
  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  submit(objectblock) {

    objectblock.username = this.globalVars.mwalletAccount;

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending mini-statement request...'
    });

    loading.present();

    //send ministatement request
    this.remoteService.postRequest(objectblock, "ministatement/show")
      .then(
        data => {

          loading.dismiss();
          this.data = data;

          if(!this.data.error) {
            this.hideheader=false;
            this.ministatement = this.data.message;
          }
          else {
            this.globalVars.presentAlert("Mini-Statement", this.data.message);

          }
        }
      )
      .catch(
        error => {

          loading.dismiss();
          this.globalVars.presentAlert("Error", "Mini-statement enquiry not successful");

        }
      );
  }

}
