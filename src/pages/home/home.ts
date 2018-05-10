import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("map") mapElement;
  map: any;

  constructor(public navCtrl: NavController, private geo: Geolocation, private platform: Platform) {

  }


  ionViewDidLoad() {
    this.initMap();
  }


  initMap() {
    this.platform.ready().then(() => {

      this.geo.getCurrentPosition().then(res => {
        let latLong = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);

        let mapOptions = {
          center: latLong,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var marker = new google.maps.Marker({
          position: latLong,
          map: this.map,
          draggable: true,
          animation: google.maps.Animation.DROP
        });

        marker.addListener('click', toggleBounce);

        marker.setMap(this.map);


        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
      }).catch(() => {
        alert("erro ao pegar geolocalizacao ");
      })
    });

  }

}
