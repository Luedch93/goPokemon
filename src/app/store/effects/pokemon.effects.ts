import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { FetchService } from "../../services/fetch.service";
import {
  loadPaginatedPokemons,
  loadPaginatedPokemonsSuccess,
  loadPokemons,
  loadPokemonsSuccess,
  newFilter,
} from "../actions/load.actions";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { PokemonListResponse } from "../../types/PokemonListResponse";

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

  searchPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newFilter),
      mergeMap(({ payload: name }) => {
        if (name === "") {
          return this.fetchService
            .getLatestsPaginationValues()
            .pipe(
              map((pokemonDetailsList: PokemonDetailsResponse[]) =>
                loadPaginatedPokemonsSuccess({ payload: pokemonDetailsList })
              )
            );
        } else {
          return this.fetchService
            .searchPokemons(name)
            .pipe(
              map((pokemonDetailsList: PokemonDetailsResponse[]) =>
                loadPaginatedPokemonsSuccess({ payload: pokemonDetailsList })
              )
            );
        }
      })
    )
  );

  constructor(private actions$: Actions, private fetchService: FetchService) {}
}
