import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-map',
  templateUrl: './full-map.component.html',
  styleUrls: ['./full-map.component.css'],
})
export class FullMapComponent implements OnInit, AfterViewInit {
  ////////////
  // Atributes
  ////////////
  @ViewChild('map') divMapa!: ElementRef;
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';
  ////////////
  // Constructor
  ////////////
  constructor() {}
  ///////////////////
  // ngAfterViewInit
  //////////////////
  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.token;

    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: this.style,
      // center: [this.lng, this.lat],
      zoom: 10,
    });
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    this.geolocation();
  }
  ///////////////////
  // ngOnInit
  //////////////////
  ngOnInit(): void {}

  public geolocation() {
    
    // Initialize the geolocate control.
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    // Add the control to the map.
    this.map.addControl(geolocate);
    this.map.on('load', function () {
      geolocate.trigger(); //Automatically activates geolocation
    });
  }
}
