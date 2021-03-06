import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {BetPage} from '../bet/bet';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = BetPage;
    this.tab3Root = SettingsPage;
  }
}
