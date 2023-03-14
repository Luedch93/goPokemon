import { createAction, props } from "@ngrx/store";
import { Pagination } from "../../types/Pagination";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { PokemonListResponse } from "../../types/PokemonListResponse";

export const loadPokemons = createAction("Load All Pokemons");

export const loadPokemonsSuccess = createAction(
  "[Pokemon State] Load All Success",
  props<{ payload: PokemonListResponse }>()
);

export const loadPaginatedPokemons = createAction(
  "[Pokemon State] Load Paginated Pokemons",
  props<{ payload: Pagination }>()
);

export const loadPaginatedPokemonsSuccess = createAction(
  "[Pokemon State] Load Pokemons Success",
  props<{ payload: PokemonDetailsResponse[] }>()
);

export const newFilter = createAction(
  "[Pokemon State] New Filter",
  props<{ payload: string }>()
);

export const clickPokemon = createAction(
  "[List Component] Click Pokemon",
  props<{ payload: PokemonDetailsResponse }>()
);

export const newPage = createAction(
  "[Pagination] New Page",
  props<{ payload: number }>()
);

export const nextPage = createAction("[Pagination] Next Page");

export const previousPage = createAction("[Pagination] Previous Page");

export const newLimit = createAction(
  "[Pagination] New Limit",
  props<{ payload: number }>()
);
