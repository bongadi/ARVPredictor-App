import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { GlobalVarsProvider } from "../../providers/global-vars/global-vars";
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";

interface LooseObject {
  [key: string]: any
}

/**
 * Generated class for the ApplyLoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-apply-loans',
  templateUrl: 'apply-loans.html',
})
export class ApplyLoansPage {
  data: any;
  error: number = 0;
  objectblock: any = {};
  formData: any = {};
  sampleMutations: any[];
  private possibleMutations: any[];
  selectedMutations: any = {};
  selectedMutationsByCategory: any = { RT: [], IN: [], PR: [] };

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
    public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.sampleMutations = [
      { name: "PR:V32I, PR:L76V,RT:69Insertion", id: 1, image: "misc.png", value: "[\"PR:V32I\",\"PR:L76V\",\"RT:69Insertion\"]" },
      { name: "RT:40F, RT:41L, RT:101E", id: 1, image: "misc.png", value: "[\"RT:40F\",\"RT:41L\",\"RT:101E\"]" }
    ];

    this.objectblock.optionSelected = {};

    this.possibleMutations = [
      {
        name: 'RT',
        label: 'Reverse Transcriptase',
        optionPosition: [
          {
            name: '40',
            options: ['F']
          },
          {
            name: '41',
            options: ['L']
          },
          {
            name: '44',
            options: ['A', 'D']
          },
          {
            name: '62',
            options: ['V']
          },
          {
            name: '65',
            options: ['N', 'R']
          },
          {
            name: '67',
            options: ['E', 'G', 'H', 'N', 'S', 'T', 'del']
          },
          {
            name: '69',
            options: ['D', 'G', 'N', 'ins', 'del']
          },
          {
            name: '70',
            options: ['E', 'G', 'N', 'Q', 'R', 'S', 'T']
          },
          {
            name: '74',
            options: ['I', 'V']
          },
          {
            name: '75',
            options: ['A', 'I', 'L', 'M', 'S', 'T']
          },
          {
            name: '77',
            options: ['L']
          },
          {
            name: '90',
            options: ['I']
          },
          {
            name: '98',
            options: ['G']
          },
          {
            name: '100',
            options: ['I', 'V']
          },
          {
            name: '101',
            options: ['E', 'H', 'N', 'P', 'Q']
          },
          {
            name: '103',
            options: ['E', 'H', 'N', 'Q', 'R', 'S', 'T']
          },
          {
            name: '106',
            options: ['A', 'I', 'M']
          },
          {
            name: '108',
            options: ['I']
          },
          {
            name: '115',
            options: ['F']
          },
          {
            name: '116',
            options: ['Y']
          },
          {
            name: '118',
            options: ['I']
          },
          {
            name: '138',
            options: ['A', 'G', 'K', 'Q', 'R']
          },
          {
            name: '151',
            options: ['L', 'M']
          },
          {
            name: '179',
            options: ['D', 'E', 'F', 'L', 'T']
          },
          {
            name: '181',
            options: ['C', 'F', 'G', 'I', 'S', 'V']
          },
          {
            name: '184',
            options: ['I', 'V']
          },
          {
            name: '188',
            options: ['C', 'F', 'H', 'L']
          },
          {
            name: '190',
            options: ['A', 'C', 'E', 'Q', 'S', 'T', 'V']
          },
          {
            name: '210',
            options: ['W']
          },
          {
            name: '215',
            options: ['A', 'C', 'D', 'E', 'F', 'I', 'L', 'N', 'S', 'V', 'Y']
          },
          {
            name: '219',
            options: ['E', 'N', 'Q', 'R', 'W']
          },
          {
            name: '221',
            options: ['Y']
          },
          {
            name: '225',
            options: ['H']
          },
          {
            name: '227',
            options: ['C', 'L']
          },
          {
            name: '230',
            options: ['I', 'L']
          },
          {
            name: '236',
            options: ['L']
          },
          {
            name: '238',
            options: ['N', 'T']
          },
          {
            name: '348',
            options: ['I']
          }
        ],
      },
      {
        name: 'PR',
        label: 'Protease',
        optionPosition: [
          {
            name: '10',
            options: ['F', 'I', 'R', 'V', 'Y']
          },
          {
            name: '11',
            options: ['I', 'L']
          },
          {
            name: '13',
            options: ['V']
          },
          {
            name: '20',
            options: ['I', 'M', 'R', 'T', 'V']
          },
          {
            name: '23',
            options: ['I']
          },
          {
            name: '24',
            options: ['F', 'I']
          },
          {
            name: '30',
            options: ['N']
          },
          {
            name: '32',
            options: ['I']
          },
          {
            name: '33',
            options: ['F', 'I', 'V']
          },
          {
            name: '35',
            options: ['G']
          },
          {
            name: '36',
            options: ['I', 'L', 'T', 'V']
          },
          {
            name: '43',
            options: ['T']
          },
          {
            name: '46',
            options: ['I', 'L', 'V']
          },
          {
            name: '47',
            options: ['A', 'V']
          },
          {
            name: '48',
            options: ['A', 'L', 'M', 'Q', 'S', 'T', 'V']
          },
          {
            name: '50',
            options: ['L', 'V']
          },
          {
            name: '53',
            options: ['L', 'Y']
          },
          {
            name: '54',
            options: ['A', 'L', 'M', 'S', 'T', 'V']
          },
          {
            name: '58',
            options: ['E']
          },
          {
            name: '63',
            options: ['P']
          },
          {
            name: '71',
            options: ['I', 'L', 'T', 'V', 'R']
          },
          {
            name: '73',
            options: ['A', 'C', 'S', 'T']
          },
          {
            name: '74',
            options: ['P', 'S']
          },
          {
            name: '76',
            options: ['V']
          },
          {
            name: '77',
            options: ['I']
          },
          {
            name: '82',
            options: ['A', 'C', 'F', 'I', 'L', 'M', 'S', 'T']
          },
          {
            name: '83',
            options: ['D']
          },
          {
            name: '84',
            options: ['A', 'C', 'V']
          },
          {
            name: '85',
            options: ['V']
          },
          {
            name: '88',
            options: ['D', 'G', 'S', 'T']
          },
          {
            name: '89',
            options: ['I', 'M', 'T', 'V']
          },
          {
            name: '90',
            options: ['M']
          },
          {
            name: '93',
            options: ['L']
          }
        ],
      },
      {
        name: 'IN',
        label: 'Integrase',
        optionPosition: [
          {
            name: '51',
            options: ['Y']
          },
          {
            name: '66',
            options: ['A', 'I', 'K']
          },
          {
            name: '74',
            options: ['M']
          },
          {
            name: '92',
            options: ['G', 'Q', 'V']
          },
          {
            name: '95',
            options: ['K']
          },
          {
            name: '97',
            options: ['A']
          },
          {
            name: '114',
            options: ['V']
          },
          {
            name: '118',
            options: ['R']
          },
          {
            name: '121',
            options: ['Y']
          },
          {
            name: '128',
            options: ['T']
          },
          {
            name: '138',
            options: ['A', 'K']
          },
          {
            name: '140',
            options: ['A', 'C', 'S']
          },
          {
            name: '143',
            options: ['C', 'H', 'K', 'R']
          },
          {
            name: '145',
            options: ['R']
          },
          {
            name: '146',
            options: ['P']
          },
          {
            name: '147',
            options: ['G']
          },
          {
            name: '148',
            options: ['A', 'K', 'R']
          },
          {
            name: '151',
            options: ['A', 'I', 'L']
          },
          {
            name: '153',
            options: ['F', 'Y']
          },
          {
            name: '155',
            options: ['H', 'S', 'T']
          },
          {
            name: '157',
            options: ['Q']
          },
          {
            name: '163',
            options: ['K', 'R']
          },
          {
            name: '230',
            options: ['R']
          },
          {
            name: '263',
            options: ['K']
          }
        ],
      }
    ];

    this.possibleMutations.forEach(mutation => this.selectedMutationsByCategory[mutation.name] = []);
    console.log(this.selectedMutationsByCategory);
    console.log(this.sampleMutations);
    this.formData.mutation = this.sampleMutations[0];
  }

  reset() {
    this.selectedMutationsByCategory = { RT: [], IN: [], PR: [] };
    this.selectedMutations = {};
    this.objectblock = {};
    this.formData = {};
  }

  onSelected(mutationLabel, mutationName, number, option) {
    let theMutation = '';
    let mutationAbbr = GlobalVarsProvider.abbreviate(mutationLabel);

    console.log(mutationLabel, mutationName, number);

    try {
      theMutation = this.getMutation(mutationName, number);
      console.log(theMutation);
    }
    catch (e) {
      this.showAlert('HIV Predictor', 'Not a valid mutation');
      return;
    }

    if (option == "*") {

      let prompt = this.alertCtrl.create({
        title: 'HIV Predictor',
        message: "Please enter the one letter code of the amino acid at position " + number,
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log('Saved clicked ' + data.name);

              this.addMutation(mutationName, mutationAbbr, theMutation, number, data.name);

              console.log(this.selectedMutations);

            }
          }
        ]
      });
      prompt.present();

    }
    else {
      this.addMutation(mutationName, mutationAbbr, theMutation, number, option);
    }

  }

  addMutation(mutationLabel, mutationAbbr, theMutation, number, name) {

    if (!this.selectedMutations["M" + number]) {
      this.selectedMutations["M" + number] = [];
    }

    this.selectedMutations["M" + number].push({
      mutationLabel: mutationLabel,
      mutationShortLabel: mutationAbbr,
      mutationName: theMutation,
      position: number,
      name: name

    });

    if (!this.selectedMutationsByCategory[mutationLabel]) {
      this.selectedMutationsByCategory[mutationLabel] = {};
    }

    if (!this.selectedMutationsByCategory[mutationLabel]["M" + number]) {
      this.selectedMutationsByCategory[mutationLabel]["M" + number] = [];
    }

    var newEntry = {
      mutationLabel: mutationLabel,
      mutationShortLabel: mutationAbbr,
      mutationName: theMutation,
      position: number,
      name: name

    };

    if (this.contains(this.selectedMutationsByCategory[mutationLabel]["M" + number], newEntry)) {
      console.log('Already exists');
      this.globalVars.presentAlert("ARV Predictor", "Element already selected");
      return;
    }
    this.selectedMutationsByCategory[mutationLabel]["M" + number].push(newEntry);

    console.log(this.selectedMutations);
    console.log(this.selectedMutationsByCategory[mutationLabel]);
    console.log(this.selectedMutationsByCategory);
  }

  contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (JSON.stringify(a[i]) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }

  getKeys(object) {
    return Object.keys(object);
  }
  hello(item) {
    console.log(typeof item);
    console.log(item);
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  getMutation(abbr, number) {
    return GlobalVarsProvider.knownMutations[abbr][number].mutation;
  }

  ionViewDidLoad() {
  }

  backToMainPage(page) {
    this.navCtrl.setRoot(page);
  }

  analyze(isSample) {
    let mutationsArray = [];
    this.objectblock = {};

    if (!isSample) {
      console.log(this.selectedMutations);
      this.objectblock.mutations = "";

      //this.selectedMutations.forEach(selectedMutation, index, array){
      console.log(Object.entries(this.selectedMutations).length);
      console.log(this.selectedMutations);

      for (let key in this.selectedMutations) {
        console.log(key);
        let selectedMutation = this.selectedMutations[key];
        for (let mutationDetail of selectedMutation) {
          var appendedLetter = mutationDetail.mutationName;

          var searchTerm = mutationDetail.mutationLabel + ':' + appendedLetter + mutationDetail.position;
          console.log(mutationDetail, mutationsArray);
          var foundElement = mutationsArray.find(function (element) {
            console.log(element, mutationDetail, "$", searchTerm, element.replace(searchTerm, ''));
            if (element.startsWith(searchTerm)) {
              return true;
            }
            return false;
          });

          console.log('adding to mutations array', mutationsArray);

          var variations = searchTerm;
          if (foundElement != undefined) {
            mutationsArray.splice(foundElement);
            variations = foundElement;
          }
          foundElement = undefined;

          mutationsArray.push(variations + mutationDetail.name);
          console.log('added to mutations array', mutationsArray);

        }
      }
      console.log(mutationsArray);
      this.objectblock.mutations = JSON.stringify(mutationsArray);
      console.log(this.objectblock.mutations);
    }
    else {
      console.log(this.formData);
      if (this.formData.mutation === undefined || typeof this.formData.mutation != 'object') {
        this.error = 1;
        return;
      }
      this.objectblock.mutations = this.formData.mutation.value;
    }

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Analyzing your input...'
    });

    loading.present();
    console.log(isSample, this.objectblock);

    this.remoteService.predict(this.objectblock, false)
      .then(
        data => {
          loading.dismiss();
          this.objectblock = {};
          console.log(data);

          this.data = data;
          let currentVersion = this.data.currentVersion;

          this.data.message = String.raw`Results found for version ${currentVersion.text} as published on ${currentVersion.publishDate}!`;

          this.globalVars.stanfordResults = {};
          this.globalVars.stanfordResults.mutation = this.data;
          console.log(this.globalVars.stanfordResults);
          this.openPage('LoanRepaymentPage');
        }
      )
      .catch(
        error => {
          loading.dismiss();
          this.objectblock = {};
          console.log(error);
          this.globalVars.presentAlert("Error", "Request was not successful");
        }
      );
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  typeOf(item) {
    return typeof item;
  }

}
