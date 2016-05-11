// Ionic
import {Page} from 'ionic-framework/ionic';
import {Geolocation} from 'ionic-native';
import {Dialogs} from 'ionic-native';

// Angular
import {Inject, OnInit} from 'angular2/core';

// Project
import {PromotionsData} from '../../providers/promotions-data';
import {GoogleMaps} from './googlemaps';

@Page({
  templateUrl: 'build/pages/map/map.html',
  providers: [GoogleMaps]
})
export class MapPage {
  static get parameters() {
    return [[PromotionsData], [GoogleMaps]];
  }

  // **********************************************

  constructor( promotionsProvider, googleMaps ) {
    this.promotionsProvider = promotionsProvider;
    this.googleMaps = googleMaps;
    this.map = null;
    this.geoloc = null; // geolocation marker
    this.promotions = [];
  }

  // **********************************************

  ngOnInit() {

  }

  // **********************************************

  onPageLoaded() {
    this.trySetupMap();
  }

  // **********************************************

  trySetupMap() {
    if (this.googleMaps.isValid())
    {
      this.setupMap();
      return;
    }
    // try to setup google map during a timeout = 5 sec
    let timeout = 5000;
    let counter = 0;
    let id = setInterval(() => {
      if (this.googleMaps.isValid()) {
        clearInterval(id);
        this.setupMap();
        return;
      }
      console.log("Google maps is not yet loaded after " + counter +" second");
      if (counter*1000 > timeout){
        clearInterval(id);
        console.error("Google maps is not yet loaded after " + counter +" second");
      }
      counter++;
    }, 1000);
  }

  // **********************************************

  setupMap() {
    console.log("Create google map");

    this.map = this.googleMaps.createMap(document, ()=>{this.fetchGeoPosition();});
    this.geoloc = this.googleMaps.createGeoLoc({lat: 1000.0, lng: 1000.0}, this.map);

    this.updatePromotions();
    this.fetchGeoPosition();



  }

  // **********************************************

  fetchGeoPosition() {

    console.log('Fetch Geo Position');
    let options = {timeout: 5000, enableHighAccuracy: true, maximumAge: 60000}; // maximumAge in millis (one minute ago)
    Geolocation.getCurrentPosition().then((resp) => {
      console.log("Geolocation : " + resp.coords.latitude + ", " + resp.coords.longitude);
      this.geoloc.setPosition({lat: resp.coords.latitude, lng: resp.coords.longitude});
      // this.geoloc.position = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      // center on the location
      this.map.setCenter(this.geoloc.position);
    },
    (error) => {
      console.log("Failed to get Geolocation");
      console.log(error);
      this.geoloc.setPosition({lat: 1000.0, lng: 1000.0});
      Dialogs.alert("Nirioo a échoué d'obtenir votre position geographique. Essayez d'activer la géolocalisation", "Position géographique", "OK");

    },
    options);
  }

  // **********************************************

  updatePromotions() {
    console.log('Update promotions ...');

    this.promotionsProvider.get().then(promotions => {
      this.promotions = promotions;
      console.log("Found " + promotions.length + " promotions");
      promotions.forEach(promotion => {
        this.googleMaps.createPromotion(promotion, this.map);
      });
    });
  }

  // **********************************************

}
