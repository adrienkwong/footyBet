import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data/data'

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  constructor(public nav: NavController, public platform: Platform, public dataService: Data, public alertCtrl: AlertController) {
  	

  }

  login(): void {
  	this.getProfile();
  }

  getProfile(): void {
  	
  	this.nav.setRoot(HomePage);
  }

}
