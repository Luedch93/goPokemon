import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { PokemonListResponse } from "../types/PokemonListResponse";

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
}
