import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {NavController, AlertController} from "ionic-angular";

/*
 Generated class for the UtilitiesProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class UtilitiesProvider {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController) {
  }

  //network Error
  protected networkError() {

    let alert = this.customAlert('Network Error', 'There was a network error, are you connected to the internet?');
    alert.present();
  }


  //network Error
  protected customAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push('MainPage');

          }
        }
      ]
    });

    return alert;
  }


}
