import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../../pages/home/home';
import { Observable } from 'rxjs/Observable';
import * as PouchDB from 'pouchdb';


@Injectable()
export class Data {
  
  public details: any;

  public data: any;
  db: any;
  remote: any;

  public matchData: any;
  matchDb: any;
  matchDbRemote: any;


  constructor(private http: Http) {

  }

  init(details){

    console.log(details);
    this.details = details;

    this.db = new PouchDB('footybet');
    this.remote = details.userDBs.betting;

    this.matchDb = new PouchDB('matches');
    this.matchDbRemote = details.userDBs.matches;

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
    this.matchDb.sync(this.matchDbRemote, options);

  }

  logout(){

    this.data = null;
    this.db.destroy().then(() => {
      console.log("database removed");
    });
  }

  getBettingData(){

    //console.log("getting betting data");

    if(this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        this.db.changes({live: true, since: 'now', include_docs:true}).on('change',(change) => {
          this.handleChange(change);
        });
      }).catch((error)=> {console.log(error);
      });
    });
  }

  getMatchesData(){

    //console.log("getting matches data");

    if(this.matchData) {
      return Promise.resolve(this.matchData);
    }

    return new Promise(resolve => {
      this.matchDb.allDocs({
        include_docs: true
      }).then((result) => {
        this.matchData = [];
        let docs = result.rows.map((row) => {
          this.matchData.push(row.doc);
        });
        resolve(this.matchData);
        this.matchDb.changes({live: true, since: 'now', include_docs:true}).on('change',(change) => {
          this.matchHandleChange(change);
        });
      }).catch((error)=> {console.log(error);
      });
    });
  }



  createBet(bet){
    this.db.post(bet);
  }
 
  updateBet(bet){
    this.db.put(bet).catch((err) => {
      console.log(err);
    });
  }
 
  deleteBet(bet){
    this.db.remove(bet).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
 
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
 
      //A document was added
      else {
        this.data.push(change.doc); 
      }
 
    }
 
  }

  matchHandleChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.matchData.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A document was deleted
    if(change.deleted){
      this.matchData.splice(changedIndex, 1);
    } 
    else {
 
      //A document was updated
      if(changedDoc){
        this.matchData[changedIndex] = change.doc;
      } 
 
      //A document was added
      else {
        this.matchData.push(change.doc); 
      }
 
    }
 
  }
  
  //Just for Practicing
  /*load(){
  	if(this.data){
  		return Promise.resolve(this.data);
  }

  	return new Promise(resolve => {
  		this.http.get('data/footybetdata.json').subscribe(res => {
  			this.data = res.json();
  			resolve(this.data);
  		});
  	});
  }*/


  
}


