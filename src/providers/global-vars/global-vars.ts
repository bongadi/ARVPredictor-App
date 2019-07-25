import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RemoteServiceProvider } from "../remote-service/remote-service";
import { AlertController, NavController, App } from "ionic-angular";

import { Contacts } from '@ionic-native/contacts';

/*
 Generated class for the GlobalVarsProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GlobalVarsProvider {

  //customer details temporary storage on global variable
  public static LOANCATEGORIES = {
    TILLLOAN: 1,
    ADVANCELOAN: 2,
    PENSIONERLOAN: 3,
    STAFFLOAN: 4,
    CONSUMER: 4
  };

  private _premium: any = {};
  public authToken: any;
  private _stanfordResults: any = [];

  public static knownMutations = {
    //NRTI
    RT: {
      "40": {
        mutation: "E",
        options: ["F"]
      },
      "41": {
        mutation: "M",
        options: ["L"]
      },
      "44": {
        mutation: "E",
        options: ["A", "D"]
      },
      "62": {
        mutation: "A",
        options: ["V"]
      },
      "65": {
        mutation: "K",
        options: ["E", "N", "R"]
      },
      "67": {
        mutation: "D",
        options: ['E', 'G', 'H', 'N', 'S', 'T', 'del']
      },
      "69": {
        mutation: "T",
        options: ['D', 'G', 'N', 'ins', 'del']
      },
      "70": {
        mutation: "K",
        options: ['E', 'G', 'N', 'Q', 'R', 'S', 'T']
      },
      "74": {
        mutation: "L",
        options: ['I', 'V']
      },
      "75": {
        mutation: "V",
        options: ['A', 'I', 'L', 'M', 'S', 'T']
      },
      "77": {
        mutation: "F",
        options: ["L"]
      },
      "90": {
        mutation: "V",
        options: ['I']
      },
      "98": {
        mutation: "A",
        options: ['G']
      },
      "100": {
        mutation: "L",
        options: ['I', 'V']
      },
      "101": {
        mutation: "K",
        options: ['E', 'H', 'N', 'P', 'Q']
      },
      "103": {
        mutation: "A",
        options: ['E', 'H', 'N', 'Q', 'R', 'S', 'T']
      },
      "106": {
        mutation: "A",
        options: ['A', 'I', 'M']
      },
      "108": {
        mutation: "V",
        options: ['I']
      },
      "115": {
        mutation: "Y",
        options: ["F"]
      },
      "116": {
        mutation: "F",
        options: ["Y"]
      },
      "118": {
        mutation: "V",
        options: ["I"]
      },
      "138": {
        mutation: "V",
        options: ['A', 'G', 'K', 'Q', 'R']
      },
      "151": {
        mutation: "Q",
        options: ['L', 'M']
      },
      "179": {
        mutation: "V",
        options: ['D', 'E', 'F', 'L', 'T']
      },
      "181": {
        mutation: "Y",
        options: ['C', 'F', 'G', 'I', 'S', 'V']
      },
      "184": {
        mutation: "M",
        options: ['I', 'V']
      },
      "188": {
        mutation: "M",
        options: ['C', 'F', 'H', 'L']
      },
      "190": {
        mutation: "M",
        options: ['A', 'C', 'E', 'Q', 'S', 'T', 'V']
      },
      "210": {
        mutation: "L",
        options: ["W"]
      },
      "215": {
        mutation: "T",
        options: ['A', 'C', 'D', 'E', 'F', 'I', 'L', 'N', 'S', 'V', 'Y']
      },
      "219": {
        mutation: "K",
        options: ['E', 'N', 'Q', 'R', 'W']
      },
      //NNRTI

      "221": {
        mutation: "H",
        options: ["Y"]
      },
      "225": {
        mutation: "P",
        options: ["H"]
      },
      "227": {
        mutation: "F",
        options: ['C', 'L']
      },
      "230": {
        mutation: "M",
        options: ['I', 'L']
      },
      "234": {
        mutation: "l",
        options: ['I']
      },
      "236": {
        mutation: "P",
        options : ['L']
      },
      "238": {
        mutation: "M",
        options : ['N', 'T']
      },
      "318": {
        mutation: "M",
        options: ['I', 'L']
      },
      "348": {
        mutation: "M",
        options : ['I']
      }
    },
    PR: {
      "10": {
        mutation: "L",
        options: ['F', 'I', 'R', 'V', 'Y']
      },
      "11": {
        mutation: "V",
        options: ['I', 'L']
      },
      "13": {
        mutation: "I",
        options: ['V']
      },
      "20": {
        mutation: "K",
        options: ['I', 'M', 'R', 'T', 'V']
      },
      "23": {
        mutation: "L",
        options: ["I"]
      },
      "24": {
        mutation: "L",
        options: ['F', 'I']
      },
      "30": {
        mutation: "D",
        options: ["N"]
      },


      "32": {
        mutation: "D",
        options: ['I']
      },
      "33": {
        mutation: "D",
        options: ['F', 'I', 'V']
      },
      "35": {
        mutation: "D",
        options: ['G']
      },
      "36": {
        mutation: "D",
        options: ['I', 'L', 'T', 'V']
      },
      "43": {
        mutation: "D",
        options: ['T']
      },
      "46": {
        mutation: "D",
        options: ['I', 'L', 'V']
      },
      "47": {
        mutation: "D",
        options: ['A', 'V']
      },
      "48": {
        mutation: "D",
        options: ['A', 'L', 'M', 'Q', 'S', 'T', 'V']
      },
      "50": {
        mutation: "D",
        options: ['L', 'V']
      },
      "53": {
        mutation: "D",
        options: ['L', 'Y']
      },
      "54": {
        mutation: "D",
        options: ['A', 'L', 'M', 'S', 'T', 'V']
      },
      "58": {
        mutation: "D",
        options: ['E']
      },
      "63": {
        mutation: "D",
        options: ['P']
      },
      "71": {
        mutation: "D",
        options: ['I', 'L', 'T', 'V', 'R']
      },
      "73": {
        mutation: "D",
        options: ['A', 'C', 'S', 'T']
      },
      "74": {
        mutation: "D",
        options: ['P', 'S']
      },
      "76": {
        mutation: "D",
        options: ['V']
      },
      "77": {
        mutation: "D",
        options: ['I']
      },
      "82": {
        mutation: "D",
        options: ['A', 'C', 'F', 'I', 'L', 'M', 'S', 'T']
      },
      "83": {
        mutation: "D",
        options: ['D']
      },
      "84": {
        mutation: "D",
        options: ['A', 'C', 'V']
      },
      "85": {
        mutation: "D",
        options: ['V']
      },
      "88": {
        mutation: "D",
        options: ['D', 'G', 'S', 'T']
      },
      "89": {
        mutation: "D",
        options: ['I', 'M', 'T', 'V']
      },
      "90": {
        mutation: "D",
        options: ['M']
      },
      "93": {
        mutation: "D",
        options: ['L']
      }
    },
    IN: {
      "51": {
        mutation: "H",
        options : ['Y']
      },
      "66": {
        mutation: "T",
        options : ['A', 'I', 'K']
      },
      "74": {
        mutation: "L",
        options : ['M']
      },
      "92": {
        mutation: "E",
        options : ['G', 'Q', 'V']
      },
      "95": {
        mutation: "Q",
        options : ['K']
      },
      "97": {
        mutation: "T",
        options : ['A']
      },
      "114": {
        mutation: "H",
        options : ['V']
      },
      "118": {
        mutation: "G",
        options : ['R']
      },
      "121": {
        mutation: "F",
        options : ['Y']
      },
      "128": {
        mutation: "A",
        options : ['T']
      },
      "138": {
        mutation: "E",
        options : ['A', 'K']
      },
      "140": {
        mutation: "G",
        options : ['A', 'C', 'S']
      },
      "143": {
        mutation: "Y",
        options : ['C', 'H', 'K', 'R']
      },
      "145": {
        mutation: "P",
        options : ['R']
      },
      "146": {
        mutation: "Q",
        options : ['P']
      },
      "147": {
        mutation: "S",
        options : ['G']
      },
      "148": {
        mutation: "Q",
        options : ['A', 'K', 'R']
      },
      "151": {
        mutation: "V",
        options : ['A', 'I', 'L']
      },
      "153": {
        mutation: "S",
        options : ['F', 'Y']
      },
      "155": {
        mutation: "N",
        options : ['H', 'S', 'T']
      },
      "157": {
        mutation: "E",
        options : ['Q']
      },
      "163": {
        mutation: "G",
        options : ['K', 'R']
      },
      "230": {
        mutation: "S",
        options : ['R']
      },
      "263": {
        mutation: "R",
        options : ['K']
      }
    }

  };



  static abbreviate(str) {
    var matches = str.match(/\b(\w)/g);       // ['J','S','O','N']
    return matches.join('');                  // JSON

  }

  validateNumber = function (res) {

    var validateResponse = "";
    if (res.indexOf("7") === 0) {
      res = "0" + res;
      if (!GlobalVarsProvider.phonenumber(res)) {
        validateResponse = "error";
        return validateResponse;
      }
      else {
        validateResponse = res;
        return validateResponse;

      }
    }

    else if (res.substring(0, 4) === "+254") {

      res = res.replace("+254", "0");
      if (!GlobalVarsProvider.phonenumber(res)) {
        validateResponse = "error";
        return validateResponse;
      }
      else {
        validateResponse = res;
        return validateResponse;

      }

    }
    else if (res.substring(0, 3) === "254") {
      res = res.replace("254", "0");
      if (!GlobalVarsProvider.phonenumber(res)) {
        validateResponse = "error";
        return validateResponse;
      } else {
        validateResponse = res;
        return validateResponse;

      }
    }
    else if (res.substring(0, 2) !== "07") {
      validateResponse = "error";
      return validateResponse;
    }
    else {

      validateResponse = res;
      return validateResponse;
    }
  };
  private navCtrl: NavController;
  private objectblock: any = {};

  constructor(public http: Http, public remoteService: RemoteServiceProvider,
    public alertCtrl: AlertController, private contacts: Contacts, private app: App) {

    this.navCtrl = app.getActiveNav();
    this.authToken = "";

  }

  get stanfordResults(): any {
    return this._stanfordResults;
  }

  set stanfordResults(value: any) {
    this._stanfordResults = value;
  }

  get premium(): any {
    return this._premium;
  }

  set premium(value: any) {
    this._premium = value;
  }

  // these variables will be release after 1 minute of inactivity
  private _lTypes: any = [];

  get lTypes(): any {
    return this._lTypes;
  }

  set lTypes(value: any) {
    this._lTypes = value;
  }

  private _lPeriods: any = [];

  get lPeriods(): any {
    return this._lPeriods;
  }

  set lPeriods(value: any) {
    this._lPeriods = value;
  }

  private _status: string;

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  private _customername: string;

  get customername(): string {
    return this._customername;
  }

  set customername(value: string) {
    this._customername = value;
  }

  private _firstlogin: string;

  get firstlogin(): string {
    return this._firstlogin;
  }

  set firstlogin(value: string) {
    this._firstlogin = value;
  }

  private _IMSI: string;

  get IMSI(): string {
    return this._IMSI;
  }

  set IMSI(value: string) {
    this._IMSI = value;
  }

  private _validateDeviceStatus: string;

  get validateDeviceStatus(): string {
    return this._validateDeviceStatus;
  }

  set validateDeviceStatus(value: string) {
    this._validateDeviceStatus = value;
  }

  private _mobilemoney: any = [];

  get mobilemoney(): any {
    return this._mobilemoney;
  }

  set mobilemoney(value: any) {
    this._mobilemoney = value;
  }

  private _accounts: any = [];

  get accounts(): any {
    return this._accounts;
  }

  set accounts(value: any) {
    this._accounts = value;
  }

  private _billers: any = [];

  get billers(): any {
    return this._billers;
  }

  set billers(value: any) {
    this._billers = value;
  }

  private _billerproviders: any = [];

  get billerproviders(): any {
    return this._billerproviders;
  }


  //getters and setters

  set billerproviders(value: any) {
    this._billerproviders = value;
  }

  private _loanproducts: any = [];

  get loanproducts(): any {
    return this._loanproducts;
  }

  set loanproducts(value: any) {
    this._loanproducts = value;
  }

  private _loanaccounts: any;

  get loanaccounts(): any {
    return this._loanaccounts;
  }

  set loanaccounts(value: any) {
    this._loanaccounts = value;
  }

  private _tills: any = [];

  get tills(): any {
    return this._tills;
  }

  set tills(value: any) {
    this._tills = value;
  }

  private _counties: any = [];

  get counties(): any {
    return this._counties;
  }

  set counties(value: any) {
    this._counties = value;
  }

  private _mwalletAccount: any = [];

  get mwalletAccount(): any {
    return this._mwalletAccount;
  }

  set mwalletAccount(value: any) {
    this._mwalletAccount = value;
  }

  private _companyid: any = [];

  get companyid(): any {
    return this._companyid;
  }

  set companyid(value: any) {
    this._companyid = value;
  }

  private _companyname: any = [];

  get companyname(): any {
    return this._companyname;
  }

  set companyname(value: any) {
    this._companyname = value;
  }

  private _advancelimit: any = [];

  get advancelimit(): any {
    return this._advancelimit;
  }

  set advancelimit(value: any) {
    this._advancelimit = value;
  }

  private _issaladv: any = [];

  get issaladv(): any {
    return this._issaladv;
  }

  set issaladv(value: any) {
    this._issaladv = value;
  }

  private _timeout: any = [];

  get timeout(): any {
    return this._timeout;
  }

  set timeout(value: any) {
    this._timeout = value;
  }

  private _telcos: any;

  get telcos(): any {
    return this._telcos;
  }

  set telcos(value: any) {
    this._telcos = value;
  }

  //for house rent
  private _estates: any = [];

  get estates(): any {
    return this._estates;
  }

  set estates(value: any) {
    this._estates = value;
  }

  private _residences: any = [];

  get residences(): any {
    return this._residences;
  }

  set residences(value: any) {
    this._residences = value;
  }

  private _rentPresentment: any = [];

  get rentPresentment(): any {
    return this._rentPresentment;
  }

  set rentPresentment(value: any) {
    this._rentPresentment = value;
  }

  private _nhifPresentment: any = [];

  get nhifPresentment(): any {
    return this._nhifPresentment;
  }

  set nhifPresentment(value: any) {
    this._nhifPresentment = value;
  }

  private _landratesPresentment: any = [];

  get landratesPresentment(): any {
    return this._landratesPresentment;
  }

  set landratesPresentment(value: any) {
    this._landratesPresentment = value;
  }

  private _miscellaneousPresentment: any;

  get miscellaneousPresentment(): any {
    return this._miscellaneousPresentment;
  }

  set miscellaneousPresentment(value: any) {
    this._miscellaneousPresentment = value;
  }

  private _loanScore: any;

  get loanScore(): any {
    return this._loanScore;
  }

  set loanScore(value: any) {
    this._loanScore = value;
  }

  private _loanCategory: number;

  get loanCategory(): number {
    return this._loanCategory;
  }

  set loanCategory(value: number) {
    this._loanCategory = value;
  }

  private _overallcashlimit: any;

  get overallcashlimit(): any {
    return this._overallcashlimit;
  }

  set overallcashlimit(value: any) {
    this._overallcashlimit = value;
  }

  //Utility functions
  /**
   *
   * @param number
   * @param n
   * @param x
   * @returns {string | any | void}
   */
  static format(number, n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  }

  /**
   *
   * @param number
   */
  static formatCurrency(number) {
    return GlobalVarsProvider.format(parseFloat(number), 2, 3);
  }

  static isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static phonenumber(mobilenumber) {

    return (/^\d{10}$/.test(mobilenumber));
  }

  setCustomerDetails(customerDetails) {
    this.status = customerDetails.status;
    this.customername = customerDetails.customername;
    this.firstlogin = customerDetails.firstlogin;
    this.IMSI = customerDetails.IMSI;
    this.validateDeviceStatus = customerDetails.validateDeviceStatus;
    this.mobilemoney = customerDetails.mobilemoney;
    this.accounts = customerDetails.accounts;
    this.billers = customerDetails.billers;
    this.billerproviders = customerDetails.billerproviders;
    this.loanproducts = customerDetails.loanproducts;
    this.loanaccounts = customerDetails.loanaccounts;
    this.tills = customerDetails.tills;
    this.counties = customerDetails.counties;
    this.mwalletAccount = customerDetails.mwalletAccount;
    this.companyid = customerDetails.companyid;
    this.companyname = customerDetails.companyname;
    this.advancelimit = customerDetails.advancelimit;
    this.issaladv = customerDetails.issaladv;
    this.timeout = customerDetails.timeout;
    this.telcos = customerDetails.telcos;

    this.overallcashlimit = customerDetails.overallcashlimit;

    //for loans
    this.lPeriods = customerDetails.loanperiods;  //["1 month","2 months","3 months","4 months","6 months","1 year"];
    this.lTypes = customerDetails.loanproducts;   //["Stanford DRD STAFF","Consumer"];

    this.estates = [];

  }

  backToMainPage() {
    this.navCtrl.setRoot('MainPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  presentAlert(title: string, message: string, callback?: any): any {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  //values as this.objectblock
  checkFields(values) {
    return new Promise(resolve => {
      var error = 0;
      for (let value in values) {
        if (value === undefined || value === '') {
          error = error + 1;
        }
      }
      resolve(error);
    });
  }

  logout() {

    //clear all info before logout
    //this = null;
  }

  pickContacts() {
    return new Promise((resolve, reject) =>

      this.contacts.pickContact().then(contact => {

        var contact = contact;

        this.objectblock.contact = {};
        this.objectblock.contact.name = contact.displayName.toString();
        this.objectblock.contact.phone = '';

        if (contact.phoneNumbers.length <= 1) {
          var res = contact.phoneNumbers[0].value;

          res = res.toString();

          var validateResponse = this.validateNumber(res);
          if (validateResponse === "error") {
            reject("Kindly select a valid number");
          }
          else {
            this.objectblock.contact.phone = validateResponse;
            resolve(this.objectblock.contact);
          }
        }
        else {

          // Object with options used to create the alert

          var options = {
            title: "Stanford DRD",
            subTitle: "Select number to use",

            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                }
              },
              {
                text: 'Login',
                handler: data => {

                  res = data.phone;

                  var validateResponse = this.validateNumber(res);
                  if (validateResponse === "error") {

                    //this.customalert("Kindly select a valid number");
                  }
                  else {
                    this.objectblock.receipt = validateResponse;
                  }

                }
              }
            ],
            inputs: []
          };

          var contacts = [];

          for (var i = 0; i < contact.phoneNumbers.length; i++) {

            var mycontact = contact.phoneNumbers[i].value;
            mycontact = mycontact.toString().replace(/\s/g, '');
            contacts.push(mycontact);

          }
        
          // Now we add the radio buttons
          for (let i = 0; i < contacts.length; i++) {
            options.inputs.push({ name: 'phone', value: contacts[i], label: contacts[i], type: 'radio' });
          }

          // Create the alert with the options
          let alert = this.alertCtrl.create(options);
          alert.present();
          reject("More than one number found");

        }

      })
    );

  }

  static isValid(field: any, type: string) {

    switch (type) {
      case 'phone':
        console.log(field);
        return GlobalVarsProvider.phonenumber(field);
      case 'email':
        return GlobalVarsProvider.isEmail(field);
      default:
        return false;
    }
  }

  private static isEmail(field: any) {

    //@Todo Email Regex
    var email = /@/;

    return !!field.match(email);
  }

  validatePhone(phonenumber): number {

    var error = 0;
    if (phonenumber == "" || phonenumber == undefined) {
      error = 50;
    }
    else if ((!(/^\d{10}$/.test(phonenumber)))) {
      error = 51;
    }
    else if (!phonenumber.startsWith('07')) {
      error = 52;
    }
    return error;
  }


  goToLogin() {
    this.navCtrl.setRoot("LoginPage");
  }
}

