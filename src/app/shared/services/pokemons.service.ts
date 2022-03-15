import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  public apiurl = environment.pokeApi;
  public pokemons$: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);
  constructor(private http: HttpClient) {}

  public setPokemons(termino: any) {
    // this.pokemons$.next();
  }

  // public getPokemons(): Observable<[]> {
  //   return this.pokemons$.asObservable();
  // }

  // get pokemon info by id
  public getPokemons(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/pokemons`);
  }
}
