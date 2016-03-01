import {Page, NavController, MenuController} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {TabsPage} from '../tabs/tabs';
//import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  static get parameters() {
    return [[NavController], [MenuController]];
  }

  constructor(nav, menu) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;

    this.slides = [
      {
        title: "Bienvenue chez <b>Nirio</b>",
        description: "<b>Nirio</b>, c'est la commerce <i>near you</i>!",
        image: "img/slidebox-img-1.jpg",
      },
      {
        title: "Vide 1",
        description: "<b>Nirio</b>, c'est la commerce <i>near you</i>!",
        image: "img/slidebox-img-2.jpg",
      },
    ];
  }

  startApp() {
    this.nav.setRoot(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
