import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {Data} from '../../providers/data/data'

@Component({
  templateUrl: 'build/pages/history/history.html',
  pipes: [DatePipe]
})
export class HistoryPage {

  public better: any;
  public matches: any;

  constructor(private navCtrl: NavController, public viewCtrl: ViewController, public dataService: Data, private navParams: NavParams) {

    this.better = this.navParams.get('better');

    console.log("This better is", this.better.name);

	  this.dataService.getMatchesData().then((data) => {
	        console.log("MATCHES DATA: ", data);
          	this.returnMatchData(data);
          
	      });

  }

  returnMatchData(matches){

		console.log("I'm returning:", matches);
		this.matches = matches;
		console.log(matches[0]);
  }

  

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
