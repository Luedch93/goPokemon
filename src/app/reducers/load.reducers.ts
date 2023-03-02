import { createReducer, on } from "@ngrx/store";

import {
  saveFilter,
  nextSave,
  previousSave,
  currentUrlSave,
  clickPokemon,
  loadPaginatedPokemonsSuccess,
  newPage,
  newLimit,
  loadPaginatedPokemons,
  loadPokemonsSuccess,
  newFilter,
  previousPage,
  nextPage,
} from "../actions/load.actions";
import { Pagination } from "../types/Pagination";
import { PokemonListItem } from "../types/PokemonListResponse";
import { PokemonState } from "../types/State";

export const initialLoadState: PokemonState = {
  total: 0,
  pokemons: [],
  detailedPaginatedList: [],
  loading: false,
  filter: "",
};
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
  on(
    loadPaginatedPokemons,
    (state, { payload }): PokemonState => ({
      ...state,
      loading: true,
    })
  ),
  on(loadPaginatedPokemonsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    detailedPaginatedList: payload,
  })),
  on(loadPokemonsSuccess, (state, { payload }) => ({
    ...state,
    pokemons: payload.results.map(
      (pokemonsListItem: PokemonListItem) => pokemonsListItem.name
    ),
    total: payload.count,
  })),
  on(newFilter, (state, { payload }) => ({
    ...state,
    filter: payload,
  }))
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
  }),
  on(previousPage, (state) => {
    return {
      ...state,
      page: state.page - 1,
    };
  }),
  on(nextPage, (state) => {
    return {
      ...state,
      page: state.page + 1,
    };
  })
);
