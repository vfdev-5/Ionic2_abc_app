import {Page} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
//import {FavoritesData} from '../../providers/favorites-data';

@Page({
  templateUrl: 'build/pages/favorites/favorites.html'
})
export class FavoritesPage {
  static get parameters() {
    //return [[FavoritesData]];
    return [];
  }

  constructor(/* favoritesData */) {
    //this.favoritesData = favoritesData;
  }

  onPageLoaded() {

  }
}
