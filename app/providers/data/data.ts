import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../../pages/home/home';
import { Observable } from 'rxjs/Observable';
import * as PouchDB from 'pouchdb';


@Injectable()
export class Data {

  fbid: number;
  username: string;
  picture: string;
  db: any;
  data: any;
  cloudantUswername: string;
  cloudantPassword: string;
  remote: string;
	
  public data: any;

  constructor(public http: Http) {
    this.db = new PouchDB('footybet');
    this.cloudantUsername = 'rastiondertivoluddedshat';
    this.cloudantPassword = 'dfa893f91188a8c010c356faa19027c05d8ea056';
    this.remote = 'https://795673f8-86fb-41bf-b967-501e550db1d2-bluemix.cloudant.com/footybet/_all_docs?limit=100';

    //Set up PouchDB
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.cloudantUsername,
        password: this.cloudantPassword
      }
    };

    this.db.sync(this.remote, options);

  }

  addDocument(message){
    this.db.put(message);
  }

  getDocuments(){

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true,
        limit: 30,
        descending: true

      }).then((result) => {

      this.data = [];

      let docs = result.rows.map((row) => {
        this.data.push(row.doc);
      });

      this.data.reverse();
      resolve(this.data);

      this.db.changes({live:true, since: 'now', include_docs: true}).on('change',(change) => {
      this.handleChange(change);
      });

      }).catch((error)=> {

        console.log(error);
      });
    });
  }

  handleChange(change){

  }



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


