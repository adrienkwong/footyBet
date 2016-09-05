import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {HistoryPage} from '../history/history';
import {PlayerModel} from '../../providers/player-model/player-model';
import {Data} from '../../providers/data/data'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  public matches: any;
  public betting: any;

  constructor(private navCtrl: NavController, private modalController: ModalController, public dataService: Data) {}

  ionViewLoaded(){
      this.dataService.getBettingData().then((data) => {
        console.log("ORIGINAL DATA: ", data);
        this.returnBettingData(data);
      });


      this.dataService.getMatchesData().then((data) => {
          console.log("MATCHES DATA: ", data);
            this.returnMatchData(data);
          
        });
  }

  returnMatchData(matches){

  console.log("I'm get this in homepage:", matches);
  this.matches = matches;
  console.log(matches);
  }

  returnBettingData(betting){

  console.log("I'm get this in homepage:", betting);
  this.betting = betting;
  console.log(betting);
  }

  createRows(){

    
  }

  presentModal(better) {

  	let modal = this.modalController.create(HistoryPage, {
      better: better
    });

  	modal.present();
    
  }



};
