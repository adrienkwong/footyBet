import {Component} from '@angular/core';
import {Nav, Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {TabsPage} from './pages/tabs/tabs';
import {Data} from './providers/data/data';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
  
})

export class MyApp {


  rootPage: any = LoginPage;

  constructor(public platform: Platform) {
    
    platform.ready().then(() => {
      
      StatusBar.styleDefault();

    });
  }


}

ionicBootstrap(MyApp, [Data]);
