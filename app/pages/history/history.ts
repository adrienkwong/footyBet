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
  public cards: any = [];
  public BHS: any = [];
  public BAS: any = [];

  constructor(private navCtrl: NavController, public viewCtrl: ViewController, public dataService: Data, private navParams: NavParams) {

    this.better = this.navParams.get('better');

    console.log("This better is", this.better.name);
    console.log("His bets is", this.better.history.match1.AS)

	  this.dataService.getMatchesData().then((data) => {
	        console.log("MATCHES DATA: ", data);
          	this.returnMatchData(data);
          
	      });

  }

  returnMatchData(matches){

	console.log("I'm returning:", matches);
	this.matches = matches;
	console.log(matches);
	this.createCards();
  }

  createCards(){
  	
  	console.log(this.matches[0], "in createCards");
  	this.cards = this.matches;
  	console.log(this.cards, "we have created cards with matches array!");

  	for(var key in this.better.history){
  		this.BHS.push(this.better.history[key].HS);
  		this.BAS.push(this.better.history[key].AS);
  		console.log("I get all AS here:", this.BAS);
  		console.log("I get all HS here:", this.BHS);
  	}



  	for(let i in this.cards){
  		console.log(i);
  		this.cards[i].BHS = this.BHS[i];
  		this.cards[i].BAS = this.BAS[i];
  		console.log("I get a complete card here", this.cards[i]);
  	}

  	console.log(this.cards);


  }
  

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
