import { createAction, props } from "@ngrx/store";
import { PokemonListResponse } from "../types/PokemonListResponse";

export const loadPokemons = createAction(
  "[List Component] Load",
  props<{ results: any[] }>()
);

export const loadPokemonsSuccess = createAction(
  "[Pokemon List] Load Pokemons Success",
  props<{ payload: PokemonListResponse }>()
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
