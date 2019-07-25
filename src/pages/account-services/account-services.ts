import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";
import { FileChooser } from '@ionic-native/file-chooser';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Http } from '@angular/http';

/**
 * Generated class for the AccountServicesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-services',
  templateUrl: 'account-services.html',
})
export class AccountServicesPage {

  formData: any = {};
  objectblock: any = {};
  sampleSequences: any = [];
  data: any;

  error: number = 0;

  sampleMutations: any[];
  private possibleMutations: any[];
  inputSequence: any = '';
  inputHeader: any = '';

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
    public platform: Platform, public remoteService: RemoteServiceProvider, public alertCtrl: AlertController, private fileChooser: FileChooser, private file: File, private filePath: FilePath, private androidPermissions: AndroidPermissions, private http: Http) {

    this.sampleSequences =
      [
        {
          header: "AY030412",
          sequence: "CCTCAAATCACTCTTTGGCAACGACCCATCGTCACAATAAAGATAGGGGGGCAGCTAARGGAAGCTCTATTAGATACAGGAGCAGATGATACAGTATTAGAAGATATAAATTTGCCAGGAAGATGGACACCAAAAATKATAGTGGGAATTGGAGGTTTTACCAAAGTAAGACAGTATGATCAGATACCTGTAGAAATTTGTGGACATAAAGCTATAGGTACAGTRTTAGTAGGACCTACACCTGCCAACATAATTGGAAGAAATCTGTTGACYCAGATTGGTTGCACTTTAAATTTTCCCATTAGTCCTATTGACACTGTACCAGTAAAATTAAAGCCAGGAATGGATGGCCCAAAAGTTAAACAATGGCCATTGACAGAAGAAAAAATAAAAGCATTAGTAGAAATTTGTGCAGAATTGGAASAGGACGGGAAAATTTCAAAAATTGGGCCTGAAAATCCATACAATACTCCAGTATTTGCCATAAAGAAAAAGAACAGYGATAAATGGAGAAAATTAGTAGATTTCAGAGAACTTAATAAGAGAACTCAAGACTTCTGGGAAGTTCAATTAGGAATACCACATCCCGGAGGGTTAAAAAAGAACAAATCAGTAACAGTACTGGATGTGGGTGATGCATATTTTTCARTTCCCTTAGATGAAGACTTCAGGAAGTATACTGCATTTACCATACCTAGTATAAACAATGAGACACCAGGGACTAGATATCAGTACAATGTGCTTCCACAGGGATGGAAAGGATCACCAGCAATATTCCAAAGTAGCATGACAAGAATCTTAGAACCTTTTAGAAAACAGAATCCAGACATAGTTATCTGTCAATAYGTGGATGATTTGTATGTAGGATCTGACTTAGAAATAGAGMAGCATAGAACAAAAGTAGAGGAACTGAGACAACATTTGTGGAAGTGGGGNTTTTACACACCAGACAAMAAACATCAGAAAGAACCTCCATTCCTTTGGATGGGTTATGAACTCCATCCTGATAAATGGACA"
        },
        {
          header: "AY030413",
          sequence: "CCTCAAATCACTCTTTGGCAACGACCCATCGTCACAATAAGGATAGGAGGGCAACTAAAGGAAGCTCTATTAGATACAGGAGCAGATGATACAGTATTAGAAGAAATGAATTTGCCAGGAAAATGGAAACCAAAAATGATAGGGGGAATTGGAGGTTTTGTCAAAGTAAGACAGTATGAGCAGATACCCGTAGAAATCTGCGGACATAAAGTTATAGGTACAGTATTAGTAGGACCTACACCTGCCAACATAATTGGAAGAAATCTGATGACTCAGCTTGGTTGTACTTTAAATTTTCCCATTAGTCCTATTGAAACTGTACCAGTAAAATTAAAGCCAGGAATGGATGGCCCAAAAGTTAAACAATGGCCATTGACAGAGGAAAAAATAAATGCATTAGTAGAAATTTGTGCAGAAATGGAAAAGGAAGGGAAAATTTCWAAAATTGGGCCTGAAAATCCATACAATACTCCAGTATTTGCYATAAAGAAAAAGAACAGTACTAGATGGAGAAAATTAGTAGATTTCAGAGAACTTAATAAGAGAACTCAAGACTTCTGGGAAGTTCAATTAGGAATACCACATCCCKCAGGGTTAAAAAAGAAAAAATCAGTAACAGTACTGGATGTGGGTGATGCATACTTTTCAGTTCCCTTATATGAAGACTTTAGAAAGTATACTGCATTTACCATACCTAGTAAAAACAATGAGACACCAGGGATTAGATACCAGTATAATGTGCTTCCACAGGGATGGAAAGGATCACCAGCAATATTCCAAAGTAGCATGACAAAAATCTTAGAGCCTTTTAGACAACAAAATCCAGACCTAGTTATCTATCAATACATGGATGATTTGTATGTAGGATCTGACTTAGAAATAGGGCAGCATAGAACAAAAATAGAGGAACTGAGACAACATCTGTTGAGGTGGGGATTTTTCACACCAGATCAAAAACATCAGAARGAACCYCCATTCCTTTGGATGGGTTATGAACTCCATCCTGATAAATGGACAGTACAGCCTATACAGCTGCCAGAA"
        }
      ];

  }

  ionViewDidLoad() {
  }

  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openFile(): void {
    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri)
          .then(entry => {
            let path = entry.substring(0, entry.lastIndexOf('/'));
            let fileName = entry.replace(path + "/", "");
            this.file.readAsText(path, fileName)
              .then(content => {
                console.log(content);
                var eachLine = content.split('\n');
                if(eachLine.length <= 0 || content.length < 3) {
                  this.globalVars.presentAlert("Warning", "The file you selected has not content");
                } else if(eachLine.length == 1) {
                    this.formData.sequenceText = content;
                } else {
                  this.formData.header = eachLine[0];
                  this.formData.sequenceText = eachLine[1];
                }

              })
              .catch(err => {
                console.log(err);
              });
          })

      })
      .catch(e => console.log(e));
  }

  onClickSelectFile() {
    this.fileChooser.open()
      .then(uri => {
        this.http.get(uri)
          .map(res => res.json()).subscribe(content => {
            console.log(content);
          }, error => {
            console.log(error);
          });

        let name = uri.split("/");
        let fileName = name[name.length - 1];
        let pathUri = uri.replace(fileName, "");

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.ACRION])
          .then(granted => {
            console.log(pathUri);
            this.file.readAsText(pathUri, fileName).then(value => {
              console.log(pathUri, value);
            }).catch(error => {
              console.log(error);
            });

          }).catch(e => console.log(e));
      })
      .catch(failed => {
        console.log("failed");
        console.log(failed);
      });

  }

  onClick() {
    console.log("click");
  }

  public loadFile(files: FileList) {

    this.platform.ready().then(() => {
      console.log("file Changed");
      console.log(files.length);
      let results = [];
      if (files && files.length > 0) {
        const file = files.item(0);//assuming only one file is uploaded
        console.log('Uplaoded file, Filename:' + file.name + ' Filesize:' + file.size + ' Filetype:' + file.type);
        const reader: FileReader = new FileReader();
        var iMax = 30;
        var i = 0;
        var millisecondsToWait = 500;
        reader.readAsText(file);
        while (reader.result == undefined && i < 30) {
          i++;

          setTimeout(function () {
            // Whatever you want to do after the wait
            console.log("continue waiting", i);
          }, millisecondsToWait);
        }
        reader.onload = () => {
          console.log(reader.result);
        };

        const fileContent: string = reader.result as string;
        console.log('fileContent:' + fileContent);
        const lines: string[] = fileContent.split('\n'); //this depends on your line end character, I'm using \n in general
        //lines is an array of string, such as "Sham went to school", loop over it and process as you like


        console.log("file read", reader);
      }

    });
  }

  analyze(isSample, isSequence) {

    if (!isSample) {
      console.log(this.formData);
      this.objectblock.sequences = [];
      this.objectblock.sequences = JSON.stringify({
        header: this.formData.header || 'Unnamed Sample',
        sequence: this.formData.sequenceText
      });
    } else {
      console.log(this.formData);
      this.objectblock.sequences = JSON.stringify(this.sampleSequences);
    }

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Analyzing your input...'
    });

    loading.present().then(() => {

      console.log(this.objectblock);
      //send loan application request
      this.remoteService.predict(this.objectblock, true)
        .then(
          data => {
            loading.dismiss();
            this.data = data;

            console.log(this.data);

            let currentVersion = this.data.currentVersion;

            this.data.message = String.raw`Results found for version ${currentVersion.text} as published on ${currentVersion.publishDate}!`;

            this.globalVars.stanfordResults = this.data;
            this.globalVars.presentAlert("Success", this.data.message);
            console.log(this.globalVars.stanfordResults);

            this.openPage('LoanRepaymentPage');
          })
        .catch(
          error => {
            loading.dismiss();
            console.log(error);

            // identify the error
            if (error) {
              // show a nice error message
              this.globalVars.presentAlert(error.error, error.reason);
            } else {
              this.globalVars.presentAlert("Error", "Request was not successful");
            }

          });
    });

  }

}
