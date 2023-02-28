import { createAction, props } from "@ngrx/store";
import { Pagination } from "../types/Pagination";
import { PokemonDetailsResponse } from "../types/PokemonDetailsResponse";

export const loadPokemons = createAction(
  "[List Component] Load",
  props<{ results: any[] }>()
);

export const loadPaginatedPokemons = createAction(
  "[List Component] Load Paginated Pokemons",
  props<{ pagination: Pagination }>()
);

export const loadPaginatedPokemonsSuccess = createAction(
  "[Pokemon List] Load Pokemons Success",
  props<{ payload: PokemonDetailsResponse[] }>()
);

export const saveFilter = createAction(
  "[List Component] Save",
  props<{ text: string }>()
);

export const previousSave = createAction(
  "[List Component] Previous",
  props<{ previous: string }>()
);
export const nextSave = createAction(
  "[List Component] Next",
  props<{ next: string }>()
);
export const currentUrlSave = createAction(
  "[List Component] currentUrl",
  props<{ url: string }>()
);

export const clickPokemon = createAction(
  "[List Component] Click Pokemon",
  props<{ pokemon: any }>()
);

export const newPage = createAction(
  "[Pagination] New Page",
  props<{ payload: number }>()
);

export const newLimit = createAction(
  "[Pagination] New Limit",
  props<{ payload: number }>()
);
