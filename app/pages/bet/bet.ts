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
  public currentMatch: any;
  public HomeTeam: any;
  public AwayTeam: any;
  public Date: any;


  constructor(private navCtrl: NavController, public dataService: Data) {
  	this.user_id = dataService.details.user_id;

  	this.dataService.getMatchesData().then((data) => {
		console.log("MATCHES DATA: ", data);
		var stopCounting = 0;
		for (var i in data){
			if((data[i].HS == "99") && (stopCounting==0)){
				this.currentMatch = data[i]
				this.HomeTeam = data[i].HT
				this.AwayTeam = data[i].AT
				this.Date = data[i].date
				stopCounting = 1
			}
		}
		
        
    });
  }


  submit(){
  	//console.log(this.user_id)
  	//console.log(this.HomeScore)
  	//console.log(this.AwayScore)
  	//console.log(this.currentMatch)
    //console.log(this.currentMatch._id)
  	//console.log(this.dataService.db)
    this.dataService.createBet(this.user_id, this.currentMatch._id, this.HomeScore, this.AwayScore)


  }
}
