// Angular
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';


@Injectable()
export class CategoriesData {
  static get parameters(){
    return [[Http]];
  }

  constructor(http) {
    // inject the Http provider and set to this instance
    this.http = http;
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
      this.http.get('data/categories.json').subscribe(res => {
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  get() {
    return this.load().then(data => {
      return data.categories;
    });
  }

  processData(data) {
    return data;
  }

}
