import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { FetchService } from "../services/fetch.service";
import {
  loadPaginatedPokemons,
  loadPaginatedPokemonsSuccess,
} from "../actions/load.actions";
import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";

@Injectable()
export class PokemonsEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPaginatedPokemons),
      mergeMap(({ pagination }) =>
        this.fetchService.getPaginatedPokemons(pagination).pipe(
          map((pokemonDetailsList: PokemonDetailsResponse[]) =>
            loadPaginatedPokemonsSuccess({ payload: pokemonDetailsList })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private fetchService: FetchService) {}
}
