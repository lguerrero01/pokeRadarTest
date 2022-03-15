import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokeMapRoutingModule } from './poke-map-routing.module';
import { FullMapComponent } from './pages/full-map/full-map.component';


@NgModule({
  declarations: [
    FullMapComponent
  ],
  imports: [
    CommonModule,
    PokeMapRoutingModule
  ]
})
export class PokeMapModule { }
