// Angular
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';

// Project
import {UserData} from './user-data';


@Injectable()
export class PromotionsData {
  static get parameters(){
    return [[Http], [UserData]];
  }

  constructor(http, user) {
    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('data/promotions.json').subscribe(res => {
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  get() {
    return this.load().then(data => {
      return data.promotions;
    });
  }

  processData(data) {

    // data.promotions.forEach(
    //   promotion => {
    //     // loop on promotions
    //     //promotion.notification_date =
    //   }
    // );

    return data;
  }

}
