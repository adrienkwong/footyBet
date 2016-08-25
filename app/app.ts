import {Component} from '@angular/core';
import {Facebook} from 'ionic-native';
import {Nav, Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {TabsPage} from './pages/tabs/tabs';
import {Data} from './providers/data/data';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  
})

export class MyApp {

  rootPage: any;

  constructor(public platform: Platform, public dataService: Data, public nav: Nav) {
    
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      
      StatusBar.styleDefault();

    });
  }


  logout(): void {
        this.nav.setRoot(LoginPage);

        this.dataService.fbid = null;
        this.dataService.username = null;
        this.dataService.picture = null;

        Facebook.logout();

      };
}

ionicBootstrap(MyApp, [Data]);
