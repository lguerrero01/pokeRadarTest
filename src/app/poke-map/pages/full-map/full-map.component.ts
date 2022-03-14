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
  center: [number, number] = [-67.9454907, 10.1317113];
  // Arreglo de marcadores
  public pokemons: any[] = [];
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
    // this.loadPokemons();
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

  public addPokemon() {
    console.log('se ejecuta');

    const newPokemon = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(this.center)
      .addTo(this.map);

    this.pokemons.push({
      marker: newPokemon,
    });

    // this.guardarMarcadoresLocalStorage()

    // nuevoMarcador.on('dragend', () => {
    //   this.guardarMarcadoresLocalStorage();
    // });
  }

  public loadPokemons() {
    // this.map.on('load', () => {
    // Add an image to use as a custom marker
    this.map.loadImage(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      (error, image: any) => {
        if (error) throw error;
        this.map.addImage('custom-marker', image);
        // Add a GeoJSON source with 2 points
        this.map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                // feature for Mapbox DC
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [-67.9454907, 10.1317113],
                },
                properties: {
                  title: 'bulbasaur',
                },
              },
              // {
              //   // feature for Mapbox SF
              //   type: 'Feature',
              //   geometry: {
              //     type: 'Point',
              //     coordinates: [-122.414, 37.776],
              //   },
              //   properties: {
              //     title: 'Mapbox SF',
              //   },
              // },
            ],
          },
        });

        // Add a symbol layer
        this.map.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'points',
          layout: {
            'icon-image': 'custom-marker',
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.25],
            'text-anchor': 'top',
          },
        });
      }
    );
    // });
  }
}
