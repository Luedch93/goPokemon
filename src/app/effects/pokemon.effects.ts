import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { FetchService } from "../services/fetch.service";
import { PokemonListResponse } from "../types/PokemonListResponse";

@Injectable()
export class PokemonsEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Pokemon List] Load Pokemons"),
      mergeMap(() =>
        this.fetchService.getPokemons().pipe(
          map((pokemonResponse: PokemonListResponse) => ({
            type: "[Pokemon List] Load Pokemons Success",
            payload: pokemonResponse,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private fetchService: FetchService) {}
}
