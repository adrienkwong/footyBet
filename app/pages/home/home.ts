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

  constructor(private navCtrl: NavController, private modalController: ModalController, public dataService: Data) {}

  ionViewLoaded(){
      this.dataService.getBettingData().then((data) => {
        console.log("ORIGINAL DATA: ", data);
      });
  }

  presentModal(better) {

  	let modal = this.modalController.create(HistoryPage, {
      better: better
    });

  	modal.present();
    
  }

};
