import { PokemonsService } from './../../../shared/services/pokemons.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { data } from 'jquery';

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
  center: [number, number] = [-67.9454907, 10.1317113];
  public latitude!: number;  
  public longitud!: number;  
  public pokemons: any[] = [];
  ////////////
  // Constructor
  ////////////
  constructor(private pokemonsService: PokemonsService) {}

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
    console.log('unasolavez');

    this.geolocation();
    // this.loadPokemons();
    this.showPokemons();
  }
  ///////////////////
  // ngOnInit
  //////////////////
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.latitude = pos.coords.latitude;
      this.longitud = pos.coords.longitude;
      // console.log(this.longitud);
    });
  }

  public geolocation() {
    // Initialize the geolocate control.
    let geolocate: mapboxgl.GeolocateControl = new mapboxgl.GeolocateControl({
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

  public addPokemon() {
    let latitude!: number;
    let longitud!: number;
    console.log('loquese');
    
      let positionRandom: any = this.getRandomLocation(longitud, latitude, 200);
      const newPokemon = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat(positionRandom)
        .addTo(this.map);
  
      this.pokemons.push({
        marker: newPokemon,
      });


  }

  public showPokemons() {
    let latitude: number;
    let longitud: number;
    navigator.geolocation.getCurrentPosition((pos) => {
      latitude = pos.coords.latitude;
      longitud = pos.coords.longitude;
    });

    this.pokemonsService.getPokemons().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let positionrandom: any = this.getRandomLocation(
          longitud,
          latitude,
          200
        );
        const marker: HTMLElement = document.createElement('div');
        marker.innerHTML = `<img src=\"${data[i].url}\" width=\"80px\" height=\"80px\">`;
        new mapboxgl.Marker({
          element: marker,
          draggable: true,
        })
          .setLngLat(positionrandom)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${data[i].name}</h3>`)) // add popup
          .addTo(this.map);
      }
    });
  }
  public getRandomLocation = function (
    //     /**
    //  * Get random geo point [latitude, longitude] within some distance from specified geo point (lat, long)
    //  *
    //  * Points will be uniformly-distributed on multiple calls.
    //  *
    //  * @param lat Latitude in degrees
    //  * @param lng Longitude in degrees
    //  * @param distance Distance in meters to limit point distribution to.
    //  *                 If negative value is provided, points will be generated on exact distance (e.g. on circle border).
    //  * @returns {*[]} Array with [latitude, longitude]

    lat: number,
    lng: number,
    distance = 200
  ) {
    // Convert to radians
    lat *= Math.PI / 180;
    lng *= Math.PI / 180;

    var radius;

    // Distance should be set in meters, negative for exact distance
    if (distance < 0) {
      // Exact distance
      radius = Math.abs(distance);
    } else {
      // Get uniformly-random distribution within peovided distance
      radius = Math.random() + Math.random();
      radius = radius > 1 ? 2 - radius : radius;
      radius *= distance ? distance : 10000; // multiply by distance meters
    }

    // Convert radius from meters to degrees to radians
    // 111319.9 meters = one degree along the equator
    radius /= 111319.9;
    // Correction for the actual distance from equator is NOT needed here
    // radius *= Math.cos(lat);
    // Convert to radians
    radius *= Math.PI / 180;

    // Random angle
    var angle = Math.random() * Math.PI * 2;

    // Get a point {nLat,nLng} in a distance={radius} out on the {angle} radial from point {lat,lng}
    var nLng,
      nLat = Math.asin(
        Math.sin(lat) * Math.cos(radius) +
          Math.cos(lat) * Math.sin(radius) * Math.cos(angle)
      );
    if (Math.cos(nLat) == 0) {
      nLng = lng;
    } else {
      nLng =
        ((lng -
          Math.asin((Math.sin(angle) * Math.sin(radius)) / Math.cos(nLat)) +
          Math.PI) %
          (Math.PI * 2)) -
        Math.PI;
    }

    // Convert to degrees
    nLat *= 180 / Math.PI;
    nLng *= 180 / Math.PI;

    return [nLat, nLng];
  };
}
