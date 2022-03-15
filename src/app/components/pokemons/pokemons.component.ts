import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/interface/pokemon';
import { PokemonsService } from 'src/app/shared/services/pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  public pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemons = data;
    });
  }
}
