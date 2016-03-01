import {Page, NavParams} from 'ionic-framework/ionic';
import {Input, Inject} from 'angular2/core';
import {MapPage} from '../map/map';
import {CategoriesPage} from '../categories/categories';
import {FavoritesPage} from '../favorites/favorites';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    // set the root pages for each tab
    this.mapRoot = MapPage;
    this.categoriesRoot = CategoriesPage;
    this.favoritesRoot = FavoritesPage;
  }
}
