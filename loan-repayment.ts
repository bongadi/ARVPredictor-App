import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {GlobalVarsProvider} from "../../providers/global-vars/global-vars";
import {RemoteServiceProvider} from "../../providers/remote-service/remote-service";

/**
 * Generated class for the LoanRepaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loan-repayment',
  templateUrl: 'loan-repayment.html',
})

export class LoanRepaymentPage {

  accounts:any;

  objectblock: any = {};
  data:any;
  drugResistance: any = {};

  constructor(public navCtrl: NavController, public globalVars: GlobalVarsProvider, public loadingCtrl: LoadingController,
              public remoteService: RemoteServiceProvider, public alertCtrl: AlertController) {

    if(!this.globalVars.stanfordResults.mutation || (this.globalVars.stanfordResults.mutation.length < 1) ) {

      //this.globalVars.backToMainPage();

      this.drugResistance = {};
      
      this.drugResistance.mutation =
        [
          {
            "gene": {
              "name": "PR"
            },
            "drugScores": [
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "ATV",
                  "displayAbbr": "ATV/r",
                  "fullName": "atazanavir/r"
                },
                "SIR": "I",
                "score": 15.0,
                "level": 3,
                "text": "Low-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 15.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "DRV",
                  "displayAbbr": "DRV/r",
                  "fullName": "darunavir/r"
                },
                "SIR": "I",
                "score": 40.0,
                "level": 4,
                "text": "Intermediate Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 15.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 20.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      },
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 5.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "FPV",
                  "displayAbbr": "FPV/r",
                  "fullName": "fosamprenavir/r"
                },
                "SIR": "R",
                "score": 95.0,
                "level": 5,
                "text": "High-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 30.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 60.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      },
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 5.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "IDV",
                  "displayAbbr": "IDV/r",
                  "fullName": "indinavir/r"
                },
                "SIR": "I",
                "score": 50.0,
                "level": 4,
                "text": "Intermediate Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 15.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 30.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      },
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 5.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "LPV",
                  "displayAbbr": "LPV/r",
                  "fullName": "lopinavir/r"
                },
                "SIR": "I",
                "score": 50.0,
                "level": 4,
                "text": "Intermediate Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 15.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 30.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      },
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 5.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "NFV",
                  "displayAbbr": "NFV",
                  "fullName": "nelfinavir"
                },
                "SIR": "I",
                "score": 30.0,
                "level": 4,
                "text": "Intermediate Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 15.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 10.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      },
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": 5.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "SQV",
                  "displayAbbr": "SQV/r",
                  "fullName": "saquinavir/r"
                },
                "SIR": "S",
                "score": 0.0,
                "level": 1,
                "text": "Susceptible",
                "partialScores": []
              },
              {
                "drugClass": {
                  "name": "PI"
                },
                "drug": {
                  "name": "TPV",
                  "displayAbbr": "TPV/r",
                  "fullName": "tipranavir/r"
                },
                "SIR": "S",
                "score": 0.0,
                "level": 1,
                "text": "Susceptible",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "V32I"
                      }
                    ],
                    "score": 5.0
                  },
                  {
                    "mutations": [
                      {
                        "text": "L76V"
                      }
                    ],
                    "score": -5.0
                  }
                ]
              }
            ],
            "mutationsByTypes": [
              {
                "mutationType": "Major",
                "mutations": [
                  {
                    "text": "V32I"
                  },
                  {
                    "text": "L76V"
                  }
                ]
              },
              {
                "mutationType": "Accessory",
                "mutations": []
              },
              {
                "mutationType": "Other",
                "mutations": []
              }
            ],
            "commentsByTypes": [
              {
                "commentType": "Major",
                "comments": [
                  {
                    "text": "V32I is a non-polymorphic PI-selected mutation associated with reduced susceptibility to each of the PIs except SQV. It is included in the Tibotec DRV genotypic susceptibility score."
                  },
                  {
                    "text": "L76V is a non-polymorphic mutation selected by IDV, LPV and DRV. It reduces susceptibility to these PIs and to FPV and NFV. It increases susceptibility to ATV, SQV and TPV. L76V is included in the Tibotec DRV genotypic susceptibility score."
                  }
                ]
              },
              {
                "commentType": "Dosage",
                "comments": [
                  {
                    "text": "There is evidence for intermediate DRV resistance. If DRV is administered it should be used twice daily."
                  }
                ]
              }
            ]
          },
          {
            "gene": {
              "name": "RT"
            },
            "drugScores": [
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "ABC",
                  "displayAbbr": "ABC",
                  "fullName": "abacavir"
                },
                "SIR": "R",
                "score": 60.0,
                "level": 5,
                "text": "High-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 60.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "AZT",
                  "displayAbbr": "AZT",
                  "fullName": "zidovudine"
                },
                "SIR": "R",
                "score": 60.0,
                "level": 5,
                "text": "High-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 60.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "D4T",
                  "displayAbbr": "D4T",
                  "fullName": "stavudine"
                },
                "SIR": "R",
                "score": 60.0,
                "level": 5,
                "text": "High-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 60.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "DDI",
                  "displayAbbr": "DDI",
                  "fullName": "didanosine"
                },
                "SIR": "R",
                "score": 60.0,
                "level": 5,
                "text": "High-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 60.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "FTC",
                  "displayAbbr": "FTC",
                  "fullName": "emtricitabine"
                },
                "SIR": "I",
                "score": 30.0,
                "level": 4,
                "text": "Intermediate Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 30.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "LMV",
                  "displayAbbr": "3TC",
                  "fullName": "lamivudine"
                },
                "SIR": "I",
                "score": 30.0,
                "level": 4,
                "text": "Intermediate Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 30.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NRTI"
                },
                "drug": {
                  "name": "TDF",
                  "displayAbbr": "TDF",
                  "fullName": "tenofovir"
                },
                "SIR": "R",
                "score": 60.0,
                "level": 5,
                "text": "High-Level Resistance",
                "partialScores": [
                  {
                    "mutations": [
                      {
                        "text": "T69Insertion"
                      }
                    ],
                    "score": 60.0
                  }
                ]
              },
              {
                "drugClass": {
                  "name": "NNRTI"
                },
                "drug": {
                  "name": "EFV",
                  "displayAbbr": "EFV",
                  "fullName": "efavirenz"
                },
                "SIR": "S",
                "score": 0.0,
                "level": 1,
                "text": "Susceptible",
                "partialScores": []
              },
              {
                "drugClass": {
                  "name": "NNRTI"
                },
                "drug": {
                  "name": "ETR",
                  "displayAbbr": "ETR",
                  "fullName": "etravirine"
                },
                "SIR": "S",
                "score": 0.0,
                "level": 1,
                "text": "Susceptible",
                "partialScores": []
              },
              {
                "drugClass": {
                  "name": "NNRTI"
                },
                "drug": {
                  "name": "NVP",
                  "displayAbbr": "NVP",
                  "fullName": "nevirapine"
                },
                "SIR": "S",
                "score": 0.0,
                "level": 1,
                "text": "Susceptible",
                "partialScores": []
              },
              {
                "drugClass": {
                  "name": "NNRTI"
                },
                "drug": {
                  "name": "RPV",
                  "displayAbbr": "RPV",
                  "fullName": "rilpivirine"
                },
                "SIR": "S",
                "score": 0.0,
                "level": 1,
                "text": "Susceptible",
                "partialScores": []
              }
            ],
            "mutationsByTypes": [
              {
                "mutationType": "NRTI",
                "mutations": [
                  {
                    "text": "T69Insertion"
                  }
                ]
              },
              {
                "mutationType": "NNRTI",
                "mutations": []
              },
              {
                "mutationType": "Other",
                "mutations": []
              }
            ],
            "commentsByTypes": [
              {
                "commentType": "NRTI",
                "comments": [
                  {
                    "text": "Amino acid insertions between codons 67 and 70 are by convention assigned to codon 69. Together with TAMs, they are associated with high-level resistance to AZT, d4T, ddI, ABC and TDF and intermediate to 3TC and FTC."
                  }
                ]
              }
            ]
          }
        ];

      this.drugResistance.sequence = this.globalVars.stanfordResults;
      console.log(this.drugResistance.sequenceAnalysis);

      this.globalVars.presentAlert("Stanford DRD",
        "Dear, Doctor Beatrice, the analysis was inconclusive.");
    }
    else {
      this.drugResistance.mutation = this.globalVars.stanfordResults.mutation.mutationsAnalysis.drugResistance;

    }

    //this.resistance = this.drugResistance[0];

    console.log(this.drugResistance);

  }

  ionViewDidLoad() {


  }

  backToMainPage(page){
    this.navCtrl.setRoot(page);
  }

  postRequest() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Sending Loan repayment request...'
    });

    loading.present();

    //send loan application request
    this.remoteService.postRequest(this.objectblock, "loans/repay/show")
      .then(
        data => {
          loading.dismiss();
          this.data = data;

          if (this.data.error === false) {
            this.globalVars.backToMainPage();

            this.globalVars.presentAlert("Stanford DRD",
              "Dear, " + this.globalVars.customername + "," +
              " your payment of KShs " + this.objectblock.amount +
              " has been credited to your loan account.");

          }
          else {
            this.globalVars.presentAlert("Stanford DRD", this.data.message);

          }

        }
      )
      .catch(
        error => {
          loading.dismiss();
          this.globalVars.presentAlert("Stanford DRD", "Loan Application not successful. \n Kindly check your details and try again");
        }
      );

  }

}
