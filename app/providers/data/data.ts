import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../../pages/home/home';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
	
  public data: any;

  constructor(public http: Http) {}

  load(){
  	if(this.data){
  		return Promise.resolve(this.data);
  }

  	return new Promise(resolve => {
  		this.http.get('data/footybetdata.json').subscribe(res => {
  			this.data = res.json();
  			resolve(this.data);
  		});
  	});
  }


  
}


