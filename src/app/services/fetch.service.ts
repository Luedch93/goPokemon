import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { Pagination } from "../types/Pagination";
import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";
import {
  PokemonListItem,
  PokemonListResponse,
} from "../types/PokemonListResponse";

@Injectable({
  providedIn: "root",
})
export class FetchService {
  private readonly API_URL = "https://pokeapi.co/api/v2";
  private pokemonListResponse?: PokemonListResponse;

  constructor(private http: HttpClient) {
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
          ).pipe(tap(console.log));
        }
      )
    );
  }
}
