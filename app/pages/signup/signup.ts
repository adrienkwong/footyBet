import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data/data';
import { TabsPage } from '../tabs/tabs';
 
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
 
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
 
    constructor(public nav: NavController, private http: Http, private Service: Data) {
 
    }
 
    register(){
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        let user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        };
 
        this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
          .subscribe(res => {
            this.Service.init(res.json());
            this.nav.setRoot(TabsPage);
          }, (err) => {
            console.log(err);
          });   
 
    }
 
}