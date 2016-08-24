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

  data: any;

  constructor(private navCtrl: NavController, private modalController: ModalController, public dataService: Data) {
    this.data = dataService.load().then((data)=> {
      this.data = data
    });
  }

  

  
  };
  
  players = [
  	new PlayerModel("Adrien", 1,0,2,1),
  	new PlayerModel("Nick", 1,0,2,1),
  	new PlayerModel("Felix", 1,0,2,1),
  	new PlayerModel("Uncle", 1,0,2,0),
  	new PlayerModel("Au", 1,0,2,1),
  	new PlayerModel("Harry", 0,0,2,0)

  ];





  presentModal() {
  	let modal = this.modalController.create(HistoryPage);
  	modal.present();
  }

}
