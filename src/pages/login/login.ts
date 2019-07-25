import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { PhoneService } from '../../providers/phone-service/phone-service';

/*
import {SweetAlertService} from 'ng2-sweetalert2';
*/
import { GooglePlus } from '@ionic-native/google-plus';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {
  @ViewChild('sequenceChart') sequenceChart;

  objectblock: any = {};
  valueforngif: boolean = false;
  demo: boolean = false;
  body: any;
  data: any;
  stage = "phone";
  encryptIsPresent = false;
  error: number = 0;
  errorMessage: string = '';

  geneSequenceResponse: any;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn: boolean = false;

  /*
  static get parameters() {
    return [[SweetAlertService]];
  }*/
  private sequenceChartData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
    public loadingCtrl: LoadingController,
    public remoteService: RemoteServiceProvider, public alertCtrl: AlertController,
    public globalVars: GlobalVarsProvider,
    public keyboard: Keyboard, private googlePlus: GooglePlus, private phoneService: PhoneService) {

    var currentUser = Meteor.user();
    console.log(currentUser);

    if (currentUser) {
      this.openPage('MainPage');
      return;
    }

    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {

    this.keyboard.onKeyboardShow().subscribe(() => {
      this.valueforngif = false
    });

    this.keyboard.onKeyboardHide().subscribe(() => {
      this.valueforngif = false
    });

    //this.sequenceChartData = this.chartData(this.geneSequenceResponse.data.viewer.sequenceAnalysis[0].alignedGeneSequences, 20);

    let options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }

    };

    //return this.getChart(this.sequenceChart.nativeElement, "bar", this.getBarChart(this.sequenceChartData), options);

  }

  openPage(page, extras?: any) {
    this.navCtrl.push(page, extras);
  }

  openPinForm(objectblock) {
    this.getDetails();
  }

  getDetails() {
    this.error = 0;
    if (this.objectblock.username == "" || this.objectblock.username == undefined) {
      this.error = 1;
    }
    else if (!(/^\d{10}$/.test(this.objectblock.username))) {
      this.error = 2;
    }
    else {

      this.stage = 'pin';
    }

  }

  submit() {
    this.error = 0;
    if (this.objectblock.username == "" || this.objectblock.username == undefined) {
      this.error = 1;
    }
    else if (!(/^\d{10}$/.test(this.objectblock.username))) {
      this.error = 2;
    }
    else if (this.objectblock.password == "" || this.objectblock.password == undefined) {
      this.error = 3;
    } else if (!(/^\d{4}$/.test(this.objectblock.password))) {
      this.error = 4;
    }
    else {

      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Logging In...'
      });

      loading.present();

      let response = RemoteServiceProvider.fakeLogin(this.objectblock.username, this.objectblock.password);
      if (response.status === true) {
        this.globalVars.customername = response.user.fname + response.user.lname;
        this.globalVars.backToMainPage();
      }
      loading.dismiss();

    }

  }

  activatepin() {
    this.error = 0;

    if (this.objectblock.IDNumber == "" || this.objectblock.IDNumber == undefined) {
      this.error = 5;
    }
    else {

      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Logging In...'
      });

      loading.present();

      //send login request
      this.remoteService.postRequest(this.objectblock, "signin/activatepin")
        .then(
          data => {

            loading.dismiss();

            this.data = data;

            if (this.data.error === false) {
              this.stage = 'pin';
              this.globalVars.presentAlert("Success", this.data.message);
            }
            else {
              this.globalVars.presentAlert("Failed", this.data.message);

            }
          }
        )
        .catch(error => {
          loading.dismiss();
          this.globalVars.presentAlert("Failed", "Could not connect to AAR system. Check your internet connection.");

        });

    }

  }

  firstchangepin() {

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

            if (this.data.error === false) {

              this.globalVars.presentAlert("Change Pin Successful", this.data.message.status);

              //if you have  valid PIN
              this.stage = 'phone';

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

  singlesignin(loginType) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Change Pin request...'
    });

    loading.present();

    //send airtime purchase request
    this.remoteService.postRequest(this.objectblock, "login/" + loginType, true)
      .then(
        data => {

          loading.dismiss();

          this.data = data;

          if (this.data.error === false) {

            this.globalVars.presentAlert("Change Pin Successful", this.data.message.status);

            //if you have  valid PIN
            this.stage = 'phone';

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

  login() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  openHomePage() {

    this.openPage('MainPage');
  }


  loginBtn(user: any) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Logging in...'
    });

    this.error = 0;
    if (user.username == "" || user.username == undefined) {
      this.error = 1;
      return;
    }
    else if (user.password == "" || user.password == undefined) {
      this.error = 2;
      return;
    }

    loading.present();
    this.phoneService.loginWithUsername(user.username, user.password).then(() => {

      loading.dismiss();
      this.openHomePage();
    })
      .catch(error => {

        loading.dismiss();
        console.log(error);
        this.error = 10;
        this.errorMessage = error.reason;
      });

  }

  loginBtn1(phone) {

    if (phone && phone.length === 10 && phone.startsWith('0')) {
      phone = '+254' + phone.substring(1, 10);
    } else {
      return;
    }

    console.log(phone);

    this.phoneService.verify(phone).then(() => {
      this.openVerifyPage(phone);
    })
      .catch(error => {
        console.log(error.reason);
        this.error = 10;
        this.errorMessage = error.reason;
      });

  }

  openVerifyPage(phone: string) {
    this.stage = 'verify';
  }

  verify(otp: string) {
    console.log('verifying ' + otp);
    console.log('verifying ' + this.objectblock.username);
    let phone = this.objectblock.username.toString();

    if (phone && phone.length === 10 && phone.startsWith('0')) {
      phone = '+254' + phone.substring(1, 10);
    } else {
      return;
    }

    this.phoneService.login(phone, otp).then(() => {
      this.openHomePage();
      console.log(Meteor.user());
    })
      .catch((e) => {
        console.log(e);
      });

  }


}
