import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { Data } from '../../providers/data/data';
import {LoadingModal} from '../loading-modal/loading-modal';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

    username: string;
    password: string;
 
    constructor(private nav: NavController, private http: Http, private Service: Data, private modalController: ModalController) {
 
    }
 
    login(){
        
        this.presentModal();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        let credentials = {
            username: this.username,
            password: this.password
        };
 
        this.http.post('http://localhost:3000/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            
            this.Service.init(res.json());
            this.nav.setRoot(TabsPage);
          }, (err) => {
            console.log(err);
          });
 
    }
 
    launchSignup(){
        this.nav.push(SignupPage);
    }

    presentModal() {

    let modal = this.modalController.create(LoadingModal);
    modal.present();


    
    }
 

}
