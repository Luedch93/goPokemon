import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { FetchService } from "../services/fetch.service";
import {
  loadPaginatedPokemons,
  loadPaginatedPokemonsSuccess,
  loadPokemons,
  loadPokemonsSuccess,
} from "../actions/load.actions";
import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";
import { PokemonListResponse } from "../types/PokemonListResponse";

@Injectable()
export class PokemonsEffects {
  loadDetailedPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPaginatedPokemons),
      mergeMap(({ payload: pagination }) =>
        this.fetchService.getPaginatedPokemons(pagination).pipe(
          map((pokemonDetailsList: PokemonDetailsResponse[]) =>
            loadPaginatedPokemonsSuccess({ payload: pokemonDetailsList })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadPokemonListResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      mergeMap(() =>
        this.fetchService
          .getPokemons()
          .pipe(
            map((pokemonsListResponse: PokemonListResponse) =>
              loadPokemonsSuccess({ payload: pokemonsListResponse })
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private fetchService: FetchService) {}
}
