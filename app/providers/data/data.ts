import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../../app/pages/home/home';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  constructor(private http: Http) {}

  private dataUrl = './footybetdata.JSON'

  getData (): Observable<Data[]> {
  	return this.http.get(this.dataUrl)
  			   .map(this.extractData)
  .catch(this.handleError);
  }
  	private extractData(res:Response){
  		let body = res.json();
  		return body.data || { };
  	}

  	private handleError (error: any) {

  		let errMsg = (error.message)?
  	error.message:
  		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    	return Observable.throw(errMsg);
  	}


  
}


