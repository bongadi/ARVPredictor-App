import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  customername: string;
  global: any;
  accounts: any;
  drugDisplayOptions: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider) {

    //this.accounts = globalVars.accounts;
    //this.customername = globalVars.customername;

    this.global = navParams.get('global');

    this.drugDisplayOptions = [
	 {
        name: 'NRTI',
        options: [
          {
            name :'ABC',
            checked : false
          },
          {
            name : 'AZT',
            checked : true
          }, {
          name : 'FTC',
            checked : true
          },
          {
            name : '3TC',
            checked : true
          },
          {
            name : 'TDF',
            checked : true
          },
          {
          name : 'D4T',
            checked : true
          },
          {
            name : 'DDI',
            checked : true
          }]
      },
       {
        name: 'NNRTI',
        options: [
          {
            name : 'EFV',
            checked : true
          },
          {
            name : 'ETR',
            checked : true
          },
          {
            name : 'NVP',
            checked : true
          },
          {
            name : 'RPV',
            checked : true
          }]
      },
      {
        name: 'INSTI',
        options: [
          {
            name : 'DTG',
            checked : true
          },
          {
            name : 'EVG',
            checked : true
          },
          {
            name : 'RAL',
            checked : true
          }]
      },
      {
        name: 'PI',
        options: [
          {
            name : 'ATV/r',
            checked : true
          },
          {
            name : 'DRV/r',
            checked : true
          },
          {
            name : 'LPV/r',
            checked : true
          },
          {
            name : 'FVP/r',
            checked : true
          },
          {
            name : 'IDV/r',
            checked : true
          },
          {
            name : 'NFV',
            checked : true
          },
          {
            name : 'SQV/r',
            checked : true
          },
          {
            name : 'TPV/r',
            checked : true
          }]
      }
    ];
  }

    handleDrugOptionChange (drugOption) {
      console.log(drugOption);
    }

  ionViewCanEnter() {

    var currentUser = Meteor.user();
    if (!currentUser) {
      this.openPage('LoginPage');
      return false;
    }

    this.user = currentUser;

    console.log(currentUser.profile.name);
    return true;
  }

  payLoanPage() {
    //check if there's a loan to be repayed
    this.openPage('LoanRepaymentPage');
  }

  openPage(page) {

    this.navCtrl.push(page, {global: this.global});
  }

  viewAccounts() {

  }

}
