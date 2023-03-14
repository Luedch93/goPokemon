import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { forkJoin, Observable, of } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { Pagination } from "../types/Pagination";
import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";
import {
  PokemonListItem,
  PokemonListResponse,
} from "../types/PokemonListResponse";
import { State } from "../types/State";

@Injectable({
  providedIn: "root",
})
export class FetchService {
  private readonly API_URL = "https://pokeapi.co/api/v2";
  private pokemonListResponse?: PokemonListResponse;

  constructor(private http: HttpClient, private store: Store<State>) {
    const cachedResponse = localStorage.getItem("PokemonListResponse");
    if (cachedResponse) {
      this.pokemonListResponse = JSON.parse(cachedResponse);
    }
  }

  getPokemons() {
    const params = {
      offset: 0,
      limit: 10000,
    };

    if (!this.pokemonListResponse) {
      return this.http
        .get<PokemonListResponse>(`${this.API_URL}/pokemon`, {
          params,
        })
        .pipe(
          tap((response) => {
            if (!this.pokemonListResponse) {
              this.pokemonListResponse = response;
              localStorage.setItem(
                "PokemonListResponse",
                JSON.stringify(response)
              );
            }
          })
        );
    }
    return of(this.pokemonListResponse);
  }

  getPaginatedPokemons(pagination: Pagination) {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;

    return this.getPokemons().pipe(
      take(1),
      switchMap<PokemonListResponse, Observable<PokemonDetailsResponse[]>>(
        (
          pokemonResponse: PokemonListResponse
        ): Observable<PokemonDetailsResponse[]> => {
          const pokemons = pokemonResponse.results.slice(start, end);

          return forkJoin(
            pokemons.map((pokemonListItem: PokemonListItem) =>
              this.http.get<PokemonDetailsResponse>(pokemonListItem.url)
            )
          );
        }
      )
    );
  }

  searchPokemons(name: string) {
    return this.getPokemons().pipe(
      switchMap((pokemonListResponse: PokemonListResponse) => {
        const founded = pokemonListResponse.results
          .filter((pokemonItem: PokemonListItem) =>
            pokemonItem.name.includes(name)
          )
          .slice(0, 20);
        if (founded.length === 0) {
          return of([]);
        }
        return forkJoin(
          founded.map((pokemonListItem: PokemonListItem) =>
            this.http.get<PokemonDetailsResponse>(pokemonListItem.url)
          )
        );
      })
    );
  }

  getLatestsPaginationValues() {
    return this.store.pipe(
      select("pagination"),
      take(1),
      switchMap<Pagination, Observable<PokemonDetailsResponse[]>>(
        (pagination) => this.getPaginatedPokemons(pagination)
      )
    );
  }

  getPokemonDetailsByName(name: string) {
    return this.http.get<PokemonDetailsResponse>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }
}
