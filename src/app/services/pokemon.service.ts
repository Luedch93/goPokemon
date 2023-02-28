import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  reduce,
  map,
  filter,
  tap,
} from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import {
  loadPaginatedPokemons,
  loadPokemons,
  nextSave,
  previousSave,
} from "../actions/load.actions";
import {
  PokemonListItem,
  PokemonListResponse,
} from "../types/PokemonListResponse";
import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";
import { Pagination } from "../types/Pagination";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private apiURL!: string;
  private filter$: Observable<string>;
  private currentUrl$: Observable<string>;
  private pagination$: Observable<Pagination>;

  constructor(private http: HttpClient, private store: Store<any>) {
    this.filter$ = store.pipe(select("filter"));
    this.currentUrl$ = store.pipe(select("apiURL"));
    this.pagination$ = store.pipe<Pagination>(select("pagination"));

    this.pagination$.subscribe((pagination: Pagination) =>
      this.store.dispatch(loadPaginatedPokemons({ pagination }))
    );

    this.filter$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value: string) => value !== ""),
        map((res) => res.toLocaleLowerCase())
      )
      .subscribe((pokemon) => {
        this.filterPokemon(pokemon).then(
          (res) => {
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
        (results) => {
          this.store.dispatch(loadPokemons({ results }));
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
      .get<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(map((res) => [res]))
      .toPromise();
  }

  getPokemonsDetailed(): Promise<PokemonDetailsResponse[]> {
    return new Promise<PokemonDetailsResponse[]>((resolve, reject) => {
      this.getPokemons().then(
        (pokemons: PokemonListResponse) => {
          this.dispatchPrevNextUrls({
            next: pokemons.next,
            previous: pokemons.previous,
          });
          const observables: Observable<PokemonDetailsResponse>[] = [];
          pokemons.results.forEach((pokemonListItem: PokemonListItem) => {
            observables.push(
              this.http.get<PokemonDetailsResponse>(pokemonListItem.url)
            );
          });
          forkJoin(observables).subscribe(
            (detailedPokemons: PokemonDetailsResponse[]) =>
              resolve(detailedPokemons),
            (err) => reject(err)
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  dispatchPrevNextUrls({
    next,
    previous,
  }: {
    next: string | null;
    previous: string | null;
  }) {
    this.store.dispatch(nextSave({ next: next ?? "" }));
    this.store.dispatch(previousSave({ previous: previous ?? "" }));
  }
}
