import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { PhoneService } from '../../providers/phone-service/phone-service';
import { EmailValidator } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  objectblock: any = {};
  error: number = 0;
  data: any;
  firstform: boolean = true;
  selectedPage: string = 'pagerGrey';
  selectedPage2: string = 'pagerGreen';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public remoteService: RemoteServiceProvider, public alertCtrl: AlertController, private phoneService: PhoneService) {

    this.objectblock.username = navParams.get('username');

  }

  ionViewDidLoad() {
  }

  submit() {
    this.error = 0;
    if (this.objectblock.fname == "" || this.objectblock.fname == undefined) {
      this.error = 1;
      this.openPage("1");
    } else if (this.objectblock.lname == "" || this.objectblock.lname == undefined) {
      this.error = 2;
      this.openPage("1");
    } else if (this.objectblock.email == "" || this.objectblock.email == undefined || !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.objectblock.email.toLowerCase())) {
      this.error = 3;
      this.openPage("1");
    } else if (this.objectblock.username == "" || this.objectblock.username == undefined) {
      this.error = 4;
      this.openPage("2");
    } else if (this.objectblock.password == "" || this.objectblock.password == undefined) {
      this.error = 5;
      this.openPage("2");
    } else {
      this.objectblock.imsi = '';

      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Sending registration request...'
      });
      loading.present();
      this.phoneService.signup(this.objectblock)
        .then(() => {
          loading.dismiss();
          this.presentAlert("Self registration", "Your registration request was successfully received.");
        })
        .catch(error => {
          loading.dismiss();
          console.log(error);
          this.presentAlert("Self registration", error.reason);
          this.error = 10;
        });
    }
  }

  public presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'Proceed',
          role: 'cancel',
          handler: () => {
            this.navCtrl.push('LoginPage');
          }
        }
      ]
    });
    alert.present();
  }

  openPage(page) {
    if (page == "1") {
      this.firstform = true;
      this.selectedPage = 'pagerGrey';
      this.selectedPage2 = 'pagerGreen';

    }
    else if (page == "2") {
      this.firstform = false;
      this.selectedPage = 'pagerGreen';
      this.selectedPage2 = 'pagerGrey';
    }
    else {
      this.navCtrl.setRoot(page);
    }
  }

}
