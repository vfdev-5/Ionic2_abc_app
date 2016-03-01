// Ionic & Cordova
import {App, IonicApp, Platform, Events} from 'ionic-framework/ionic';
import {PushNotification} from 'phonegap-plugin-push';


// Moment
//import {Moment} from 'moment/moment.js';

// Project
import {TabsPage} from './pages/tabs/tabs';
import {TutorialPage} from './pages/tutorial/tutorial';
import {UserData} from './providers/user-data';
import {PromotionsData} from './providers/promotions-data';
import {CategoriesData} from './providers/categories-data';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';


@App({
  templateUrl: 'build/app.html',
  providers: [UserData, PromotionsData, CategoriesData],
  config: {
    production: true,
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform], [IonicApp], [Events], [UserData], [PromotionsData]];
  }

  constructor(platform, app, events, userData, promotionsData) {

    // Setup locale to MomentJs
    //moment.locale("fr");
    //console.log("Moments locale : " + moment.locale());


    this.app = app;
    this.events = events;
    this.userData = userData;
    this.rootPage = TabsPage;

    // load promotions
    promotionsData.get();

    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

      this.setupPushNotifications();
    });

    this.loggedInPages = [
      { title: 'Logout', component: TabsPage, icon: 'log-out' }
    ];

    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Signup', component: SignupPage, icon: 'person-add' }
    ]

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();

  }

  openTutorialPage() {
    let nav = this.app.getComponent('nav');
    nav.setRoot(TutorialPage);

  }

  openPage(page) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');

    if (page.index) {
      nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }

  setupPushNotifications() {

    let push = PushNotification.init({
      android: {
        senderID: "dogwood-day-115215", // maps to the project number in the Google Developer Console
        sound: true,
      },
      ios: {
          alert: true,
          badge: true,
          sound: true
      },
    });

    push.on('registration', (data) => {
      console.log(data.registrationId);
    });

    push.on('notification', (data) => {
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });

    push.on('error', (e) => {
      console.log(e.message);
    });

  }


}
