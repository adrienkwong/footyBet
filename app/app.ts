import {Component} from '@angular/core';
import {Facebook} from 'ionic-native';
import {Nav, Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {TabsPage} from './pages/tabs/tabs';
import {Data} from './providers/data/data'




@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [Data]);
