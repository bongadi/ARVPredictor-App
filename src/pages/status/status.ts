import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the StatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  objectblock:any={};
  accounts:any=[];
  valueforngif:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVarsProvider,
   public keyboard: Keyboard) {
    this.accounts=globalVars.accounts;
    this.objectblock.account=this.accounts[0];
  }

  ionViewDidLoad() {
    this.keyboard.onKeyboardShow().subscribe(()=>{this.valueforngif=false});
    this.keyboard.onKeyboardHide().subscribe(()=>{this.valueforngif=true});

  }

}
