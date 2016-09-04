import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {Data} from '../../providers/data/data'

@Component({
  templateUrl: 'build/pages/history/history.html',
  pipes: [DatePipe]
})
export class HistoryPage {

  constructor(private navCtrl: NavController, public viewCtrl: ViewController, public dataService: Data, private navParams: NavParams) {

  	console.log(this.navParams.get('better'));

	  this.dataService.getMatchesData().then((data) => {
	        console.log("MATCHES DATA: ", data);
	      });

  }

  


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
