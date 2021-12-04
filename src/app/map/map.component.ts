/// <reference types="@types/googlemaps" />
import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  BSUIR = {lat: 53.91150525456882, lng: 27.595596313476566};
  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor() { }

  ngOnInit(): void {
    // this.map = new google.maps.Map(document.getElementById("map"), {
    //   zoom: 4,
    //   center: this.BSUIR,
    // });
    // console.log(this.map);
    // this.marker = new google.maps.Marker({
    //   position: this.BSUIR,
    //   map: this.map,
    // });
  }

  initMap(): void {
    console.log('initMap');
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: this.BSUIR,
    });
    console.log(this.map);
    this.marker = new google.maps.Marker({
      position: this.BSUIR,
      map: this.map,
    });
  }
}
