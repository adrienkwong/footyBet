var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var SuperLogin = require('superlogin');
 
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
var config = {
  dbServer: {
    protocol: 'http://',
    host: 'https://79fd7df4-85f7-42f4-bce6-a57b9c11d6fb-bluemix.cloudant.com/footybet/_all_docs',
    user: 'lampardkwong@gmai.com',
    password: 'billy711',
    userDB: 'sl-users',
    couchAuthDB: '_users'
  },
  mailer: {
    fromEmail: 'gmail.user@gmail.com',
    options: {
      service: 'Gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'userpass'
        }
    }
  },
  security: {
    maxFailedLogins: 3,
    lockoutTime: 600,
    tokenLife: 86400,
    loginOnRegistration: true,
  },
  userDBs: {
    defaultDBs: {
      private: ['supertest']
    }
  },
  providers: { 
    local: true
  }
}
 
// Initialize SuperLogin 
var superlogin = new SuperLogin(config);
 
// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);
 
app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));