import { createReducer, on } from "@ngrx/store";

import {
  clickPokemon,
  loadPaginatedPokemonsSuccess,
  newPage,
  newLimit,
  loadPaginatedPokemons,
  loadPokemonsSuccess,
  newFilter,
  setPage,
} from "../actions/load.actions";
import { Pagination } from "../../types/Pagination";
import { PokemonListItem } from "../../types/PokemonListResponse";
import { PokemonState } from "../../types/State";

export const initialLoadState: PokemonState = {
  pokemons: {
    data: [],
    loaded: false,
    loading: false,
    total: 0,
  },
  detailedPaginatedList: {
    data: [],
    loading: false,
    loaded: false,
  },
  selectedPokemon: {
    data: undefined,
    loaded: false,
    loading: false,
  },
  filter: "",
  showPagination: true,
};
export const saveInitialState = "";

export const paginatorInitialState: Pagination = {
  limit: 20,
  page: 1,
  total: 0,
};

export const previousState = "";
export const nextState = "";
export const currentUrlState = "https://pokeapi.co/api/v2/pokemon";

export const loadReducer = createReducer(
  initialLoadState,
  on(
    loadPaginatedPokemons,
    (state): PokemonState => ({
      ...state,
      detailedPaginatedList: {
        ...state.detailedPaginatedList,
        loading: true,
      },
    }),
  ),
  on(loadPaginatedPokemonsSuccess, (state, { payload }) => ({
    ...state,
    detailedPaginatedList: {
      data: payload,
      loading: false,
      loaded: true,
    },
  })),
  on(loadPokemonsSuccess, (state, { payload }) => ({
    ...state,
    pokemons: {
      data: payload.results.map(
        (pokemonsListItem: PokemonListItem) => pokemonsListItem.name,
      ),
      total: payload.count,
      loaded: true,
      loading: true,
    },
  })),
  on(newFilter, (state, { payload }) => ({
    ...state,
    filter: payload,
    showPagination: payload ? false : true,
  })),
  on(clickPokemon, (state, { payload }) => ({
    ...state,
    selectedPokemon: {
      data: payload,
      loaded: true,
      loading: false,
    },
  })),
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
  on(setPage, (state, { payload }) => {
    return {
      ...state,
      page: payload,
    };
  }),
  on(loadPokemonsSuccess, (state, { payload }) => ({
    ...state,
    total: payload.count,
  })),
);
