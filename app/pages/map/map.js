// Ionic
import {Page} from 'ionic-framework/ionic';

// Angular
import {Inject} from 'angular2/core';

// Project
import {PromotionsData} from '../../providers/promotions-data';


@Page({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  static get parameters() {
    return [[PromotionsData]];
  }

  constructor( promotionsProvider ) {
    this.promotionsProvider = promotionsProvider;
    this.map = null;
    this.promotions = [];
  }

  onPageLoaded() {
    let mapEle = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
        center: new google.maps.LatLng(43.605091, 1.441612),
        zoom: 14
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

    this.updatePromotions();
  }

  updatePromotions() {
    console.log('Update promotions ...');

    this.promotionsProvider.get().then(promotions => {
      this.promotions = promotions;
      console.log("Found " + promotions.length + " promotions");
      promotions.forEach(promotion => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${promotion.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: promotion.shop,
          map: this.map,
          title: promotion.name
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });

      });
    });
  }


}
