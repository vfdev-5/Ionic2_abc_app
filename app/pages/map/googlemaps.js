// Angular
import {Injectable, Inject} from 'angular2/core';

// Google maps
import GoogleMapsLoader from 'google-maps/lib/Google'

GoogleMapsLoader.KEY = "AIzaSyACca0tYFwWVfB_dMtUziBlCKBA4_ez35Q";
GoogleMapsLoader.LIBRARIES = ['drawing'];
GoogleMapsLoader.LANGUAGE = 'fr';

@Injectable()
export class GoogleMaps {

  static get parameters(){
    return [];
  }

  constructor() {
    this.google = null;
    this.mapOptions = {
      center: {lat: 43.605091, lng: 1.441612},
      zoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
    };

    let vm = this;
    GoogleMapsLoader.load( google => {
    	vm.google = google;
      vm.mapOptions.zoomControlOptions={
        position: vm.google.maps.ControlPosition.TOP_LEFT
      };
    });
  }

  isValid() {
    return this.google != null;
  }

  createMap(document, geoLocCallback) {
    let mapDivElement = document.getElementById('map');
    let map = new this.google.maps.Map(mapDivElement, this.mapOptions);
    this.google.maps.event.addListenerOnce(map, 'idle', () => {
      mapDivElement.classList.add('show-map');
    });

    // create custom controller for geolocation :
    let geoLocDiv = document.createElement('div');
    // geoLocDiv.style.clear = 'both';
    let geoLocImg = document.createElement('img');
    geoLocImg.src="img/geoloc.png";
    geoLocDiv.addEventListener('click', geoLocCallback);
    geoLocDiv.appendChild(geoLocImg);
    geoLocDiv.index = 1;
    geoLocDiv.style['padding-bottom'] = '10px';
    geoLocDiv.style['padding-right'] = '10px';
    map.controls[this.google.maps.ControlPosition.RIGHT_BOTTOM].push(geoLocDiv);
    return map;
  }

  createPromotion(promotion, map) {
    let infoWindow = new this.google.maps.InfoWindow({
      content: `<h5>${promotion.name}</h5>`
    });

    let marker = new this.google.maps.Marker({
      position: promotion.shop,
      map: map,
      title: promotion.name
    });
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    return marker;
  }

  createGeoLoc(coords, map) {
    return new google.maps.Marker({
      position: coords,
      icon: {
        path: this.google.maps.SymbolPath.CIRCLE,
        scale: 6
      },
      draggable: false,
      map: map
    });
  }


  getOptions() {
    return this.mapOptions;
  }

  getGoogleObj() {
    return this.google;
  }

}
