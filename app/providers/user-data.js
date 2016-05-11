// Ionic
import {Storage, SqlStorage, Events} from 'ionic-framework/ionic';

// Angular
import {Injectable, Inject} from 'angular2/core';


@Injectable()
export class UserData {
  static get parameters(){
    return [[Events]];
  }

  constructor(events) {
    this.storage = new Storage(SqlStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
  }

  login(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }

  signup(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('username', username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN);
    // .then((value) => {
    //   return value;
    // });
  }

  // get username :
  getUsername() {
   return this.storage.get('username').then((value) => {
     for (let p in value) {
       console.log("p=" + p + " | value[p]=" + value[p]);
     }
     return value;
   }, (reason) => {
     console.log(reason);
     return "Null";
   });
  }
}
