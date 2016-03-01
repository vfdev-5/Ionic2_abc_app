// Ionic
import {IonicApp, Page, NavController} from 'ionic-framework/ionic';

// Angular
import {Inject} from 'angular2/core';

// Project
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UserData]];
  }

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.login = {};
    this.submitted = false;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login();
      this.nav.setRoot(TabsPage);
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
