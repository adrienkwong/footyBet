import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
 
@Component({
  selector: 'loading-modal',
  templateUrl: 'build/pages/loading-modal/loading-modal.html'
})
export class LoadingModal {
 
  constructor(private navCtrl: NavController, public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}