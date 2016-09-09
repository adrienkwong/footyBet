import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Data} from '../../providers/data/data';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'build/pages/bet/bet.html',
  pipes: [DatePipe]
})
export class BetPage {

  public HomeScore: any;
  public AwayScore: any;
  public user_id: any;
  public doc_id: any;
  public currentMatch: any;
  public HomeTeam: any;
  public AwayTeam: any;
  public Date: any;
  public allBets: any;
  public idfortable: any;


  constructor(private navCtrl: NavController, public dataService: Data) {
  	this.user_id = dataService.details.user_id;
  	console.log(dataService.details)

  	//convert user_id to doc_id
  	this.dataService.getBettingData().then((data) => {
  		for (var better of data){
  			if(better.user_id == this.user_id){
  				this.doc_id = better._id
  				console.log(this.doc_id)
  			}
  		}
  	})

  	this.dataService.getMatchesData().then((data) => {
		console.log("MATCHES DATA: ", data);
		var stopCounting = 0;
		for (var i in data){
			if((data[i].HS == "N/A") && (stopCounting==0)){
				this.currentMatch = data[i]
				this.HomeTeam = data[i].HT
				this.AwayTeam = data[i].AT
				this.Date = data[i].date
				stopCounting = 1
				}
			}
		});

	//get other better's bet on this match
  	this.dataService.getBettingData().then((data) => {
	  			this.allBets = data
	  			console.log(this.allBets)
  	}) 	

  }

  submit(){
  	//console.log(this._id)
  	//console.log(this.HomeScore)
  	//console.log(this.AwayScore)
  	//console.log(this.currentMatch)
    //console.log(this.currentMatch._id)
  	//console.log(this.dataService.db)
    this.dataService.createBet(this.doc_id, this.currentMatch._id, this.HomeScore, this.AwayScore)
  }
}
