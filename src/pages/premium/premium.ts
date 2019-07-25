import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the PremiumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-premium',
  templateUrl: 'premium.html',
})
export class PremiumPage {
  data: any;
  private error: number;
  private objectblock: any = {};

  message: any;
  premiumPlans: any;
  userType: number;
  request: any = {};

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController, public navParams: NavParams) {

    // message is an object we have in our nav-parameters
    this.message = this.navParams.get('message');
    this.userType = this.navParams.get('userType');

    this.premiumPlans = this.globalVars.premium.installments_parsed;

    if (this.premiumPlans != undefined && this.premiumPlans.length > 0) {
      this.request.premiumPlan = this.premiumPlans[0];

    }

    console.log(this.objectblock.premiumAmount);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PremiumPage');
  }

  submit() {

    this.error = 0;

    this.objectblock = this.request.premiumPlan;
    this.objectblock.premiumAmount = this.globalVars.premium.premiumAmount;
    this.objectblock.expired = this.globalVars.premium.expired;
    this.objectblock.policy = this.globalVars.premium.policy;
    this.objectblock.accountNumber = this.globalVars.premium.accountNumber;


    console.log(this.objectblock.premiumAmount);

    if (this.objectblock.amount == "" || this.objectblock.amount == undefined) {
      this.error = 1;
    }

    else if (this.objectblock.premiumAmount == "" || this.objectblock.premiumAmount == undefined) {
      this.error = 2;
    }

    else if (this.objectblock.months == "" || this.objectblock.months == undefined) {
      this.error = 3;
    }
    else {

      let alert = this.alertCtrl.create({
        title: 'Stanford DRD',
        message: 'Please confirm your insurance premium payment plan amount KES. ' + this.objectblock.premiumAmount + ', monthly installment KES. ' + this.objectblock.amount + ' , tenure ' + this.objectblock.months + ' Months(s)?',


        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.globalVars.goToLogin();
            }
          },
          {
            text: 'Yes',
            handler: () => {

              //Prompt to accept terms and conditions
              this.requestTermsAndConditions();
            }
          }
        ]
      });
      alert.present();
    }
    console.log(this.error);
  }

  requestTermsAndConditions() {

    this.error = 0;

    let alert = this.alertCtrl.create({
      title: 'Stanford DRD',
      message: 'Accept terms and conditions to finance your insurance premium of KES. ' + this.objectblock.premiumAmount + ' in ' + this.objectblock.months + ' monthly installments of KES. ' + this.objectblock.amount + '  Use Mpesa paybill 101400.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

            this.globalVars.presentAlert("Premium Terms", "You did not accept to the terms and conditions of this product.");
            this.globalVars.goToLogin();

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
      content: 'Processing Premium Request...'
    });

    loading.present();

    //send airtime purchase request
    this.remoteService.postRequest(this.objectblock, "premium/show")
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {
            this.globalVars.goToLogin();
            this.globalVars.presentAlert("Premium", this.data.message);
          }
          else {
            this.globalVars.presentAlert("Premium Request Failed", this.data.message);

          }
        }
      )
      .catch(
        error => {
          loading.dismiss();

          this.globalVars.presentAlert("Error", "Premium failed. Kindly check your details and try again.");
        }
      );
  }

}
