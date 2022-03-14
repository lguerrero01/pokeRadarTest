import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  public apiurl = environment.pokeApi;
  private pokemons$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  public setPokemons(termino: string) {
    this.pokemons$.next(termino);
  }

  public getPokemons(): Observable<string> {
    return this.pokemons$.asObservable();
  }

  // get pokemon info by id
  getPokemonInfoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiurl}${id}`);
  }
}
