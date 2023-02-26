import { createReducer, on } from "@ngrx/store";

import {
  loadPokemons,
  saveFilter,
  nextSave,
  previousSave,
  currentUrlSave,
  clickPokemon,
  loadPokemonsSuccess,
  newPage,
  newLimit,
} from "../actions/load.actions";
import { Pagination } from "../types/Pagination";

export const initialLoadState: any = null;
export const saveInitialState = "";

export const paginatorInitialState: Pagination = {
  limit: 20,
  page: 1,
};

export const previousState = "";
export const nextState = "";
export const currentUrlState = "https://pokeapi.co/api/v2/pokemon";

export const pokemonInitialState = null;

export const loadReducer = createReducer(
  initialLoadState,
  on(loadPokemons, (_, payload) => {
    return [...payload.results];
  })
  // on(loadPokemonsSuccess, (_, payload) => {
  //   return payload.payload;
  // })
);

export const saveReducer = createReducer(
  saveInitialState,
  on(saveFilter, (_: any, payload: any) => {
    return payload.text;
  })
);

export const previousReducer = createReducer(
  previousState,
  on(previousSave, (state, payload) => {
    return payload.previous;
  })
);

export const nextReducer = createReducer(
  nextState,
  on(nextSave, (state, payload) => {
    return payload.next;
  })
);

export const currentUrlReducer = createReducer(
  currentUrlState,
  on(currentUrlSave, (state, payload) => {
    return payload.url;
  })
);

export const pokemonReducer = createReducer(
  pokemonInitialState,
  on(clickPokemon, (state, payload) => {
    return payload.pokemon;
  })
);

export const paginationReducer = createReducer(
  paginatorInitialState,
  on(newPage, (state, { payload }) => {
    return {
      ...state,
      page: payload,
    };
  }),
  on(newLimit, (state, { payload }) => {
    return {
      ...state,
      limit: payload,
    };
  })
);
