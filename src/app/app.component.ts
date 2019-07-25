import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import {DomSanitizer} from "@angular/platform-browser";
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  browser:any;
  pages: Array<{title: string, component: string, icon:any}>;
  private _htmlProperty: string = '<progress></progress>';

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private iab: InAppBrowser, private _sanitizer: DomSanitizer,
              public globalVars: GlobalVarsProvider,public loadingCtrl: LoadingController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Main Services', component: 'MainPage', icon:'grid' },
     // { title: 'HIVDB Program', component: 'MainPage', icon:'wifi' },
     // { title: 'About HIV Predictor', component: 'MainPage', icon:'information-circle' },
      { title: 'Contact Us', component: 'ContactPage', icon:'call' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      setTimeout(() => {
        this.splashScreen.hide();
      }, 500);

    });
  }

  logout() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Logging out...'
    });

    loading.present();    
    Meteor.logout((error) => {
      loading.dismiss();
      if(error) {
        this.globalVars.presentAlert("ARV Predictor", "You cannot logout at this time. Please try again later");
        return;
      }
      this.nav.setRoot('LoginPage');

    });
  }

  openPage(page) {  

    if(page.title=="About HIV Predictor"){
      this.openBrowser("https://hivdb.stanford.edu/about/");
    }
    else if(page.title=="HIVDB Program"){
      this.openBrowser("https://hivdb.stanford.edu/hivdb/by-mutations/");
    }
    else{
      if(page.component == "LoginPage") {
        console.log("logging out");
        Meteor.logout();
      }
      this.nav.setRoot(page.component);
    }
  }
  openBrowser(url) {
    this.browser = this.iab.create(url);
    this.browser.show();
  }

   htmlProperty() {
    return this._sanitizer.bypassSecurityTrustHtml(this._htmlProperty);
  }


}
