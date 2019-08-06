import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, reduce, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { loadPokemons, nextSave, previousSave } from '../actions/load.actions';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly apiURL = 'https://pokeapi.co/api/v2/pokemon';
  private filter$: Observable<string>;

  constructor(private http: HttpClient, private store: Store<any>) {
    this.filter$ = store.pipe(select('filter'));

    this.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((res) => res.toLocaleLowerCase())
    ).subscribe(pokemon => {
      this.filterPokemon(pokemon).then((res: any[]) => {
        this.store.dispatch(loadPokemons({results: res}));
      }, err => {
        this.store.dispatch(loadPokemons({results: []}));
      });
    });

   }

  filterPokemon(name): Promise<any> {
    if (name !== '') {
      return this.getPokemonDetail(name);
    }

    return this.getPokemonsDetailed();
  }

  getPokemons() {
    return this.http.get(this.apiURL).toPromise();
  }

  getPokemonDetail(name) {
    return this.http.get(this.apiURL + `/${name}`).pipe(
      reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [])
    ).toPromise();
  }

  getPokemonsDetailed() {
    return new Promise((resolve, reject) => {
      this.getPokemons().then((pokemons: any) => {
        this.dispatchPrevNextUrls(pokemons);
        const observables = [];
        pokemons.results.forEach(element => {
          observables.push(this.http.get(element.url));
        });
        forkJoin(observables).subscribe(detailedPokemons =>
            resolve(detailedPokemons),
          err =>
            reject(err));
      }, err => {
        reject(err);
      });
    });
  }

  dispatchPrevNextUrls(pokemons) {
    if (pokemons.next !== null) {
      this.store.dispatch(nextSave(pokemons));
    }
    if (pokemons.previous !== null) {
      this.store.dispatch(previousSave(pokemons.previous));
    }
  }
}
