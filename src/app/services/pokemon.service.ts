import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  reduce,
  map,
} from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { loadPokemons, nextSave, previousSave } from "../actions/load.actions";
import { PokemonListResponse } from "../types/PokemonListResponse";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private apiURL!: string;
  private filter$: Observable<string>;
  private currentUrl$: Observable<string>;

  constructor(private http: HttpClient, private store: Store<any>) {
    this.filter$ = store.pipe(select("filter"));
    this.currentUrl$ = store.pipe(select("apiURL"));

    this.filter$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((res) => res.toLocaleLowerCase())
      )
      .subscribe((pokemon) => {
        this.filterPokemon(pokemon).then(
          (res: any[]) => {
            this.store.dispatch(loadPokemons({ results: res }));
          },
          (err) => {
            this.store.dispatch(loadPokemons({ results: [] }));
          }
        );
      });

    this.currentUrl$.subscribe((url) => {
      this.apiURL = url;
      this.getPokemonsDetailed().then(
        (res: any[]) => {
          this.store.dispatch(loadPokemons({ results: res }));
        },
        (err) => {
          this.store.dispatch(loadPokemons({ results: [] }));
        }
      );
    });
  }

  filterPokemon(name: string): Promise<any> {
    if (name !== "") {
      return this.getPokemonDetail(name);
    }

    return this.getPokemonsDetailed();
  }

  getPokemons() {
    return this.http.get<PokemonListResponse>(this.apiURL).toPromise();
  }

  getPokemonDetail(name: string) {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        reduce((acc, item: any) => {
          acc.push(item);
          return acc;
        })
      )
      .toPromise();
  }

  getPokemonsDetailed() {
    return new Promise<any>((resolve, reject) => {
      this.getPokemons().then(
        (pokemons: PokemonListResponse) => {
          this.dispatchPrevNextUrls(pokemons);
          const observables: any[] = [];
          pokemons.results.forEach((element: any) => {
            observables.push(this.http.get(element.url));
          });
          forkJoin(observables).subscribe(
            (detailedPokemons) => resolve(detailedPokemons),
            (err) => reject(err)
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  dispatchPrevNextUrls(pokemons: any) {
    this.store.dispatch(nextSave(pokemons));
    this.store.dispatch(previousSave(pokemons));
  }
}
