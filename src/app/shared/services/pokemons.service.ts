import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  public apiUrlPokemon = environment.pokeApi;
  public baseUrl = 'http://localhost:3000/pokemons';
  public pokemons$: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  constructor(private http: HttpClient) {}

  // get pokemon info by id
  public getPokemons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  public getPokemonById(id: number) {
    return this.http.get<any>(`${this.apiUrlPokemon}${id}`).toPromise();
  }
  
  public async addRandomPokemon(): Promise<Observable<any>> {
    let randomPokemon = Math.floor(Math.random() * (100 - 1)) + 1;
    let currenValue = await this.getPokemonById(randomPokemon);
    const request = {
      id: new Date().getTime(),
      customId: randomPokemon,
      name: currenValue.name,
      url: currenValue.sprites.front_default,
    };

    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(request);

    return this.http.post(`${this.baseUrl}`, body, { headers: headers }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
