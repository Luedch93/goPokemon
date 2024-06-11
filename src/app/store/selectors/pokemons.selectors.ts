import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PokemonState } from "src/app/types/State";
import { selectPaginationState } from "./pagination.selectors";

export const selectPokemonsState =
  createFeatureSelector<PokemonState>("pokemons");

// Pokemons
export const selectPokemons = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.pokemons,
);

export const selectPokemonsTotal = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.pokemons.total,
);

export const selectPokemonsLoading = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.pokemons.loading,
);

export const selectPokemonsListData = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.pokemons.data,
);

export const selectPokemonsLoaded = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.pokemons.loaded,
);
// End pokemons

// Detailed list
export const selectPokemonsDetailsList = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.detailedPaginatedList,
);

export const selectPokemonsDetailsListData = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.detailedPaginatedList.data,
);

export const selectPokemonsDetailsListLoading = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.detailedPaginatedList.loading,
);

export const selectPokemonsDetailsListLoaded = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.detailedPaginatedList.loaded,
);

export const selectPokemonsDetailsListLength = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.detailedPaginatedList.data.length,
);
// End detailed list

// Filter
export const selectPokemonsFilter = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.filter,
);
// End filter

// Show pagination
export const selectPokemonsShowPagination = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.showPagination,
);
// end show pagination

// Selected Pokemon
export const selectSelectedPokemon = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.selectedPokemon,
);

export const selectSelectedPokemonData = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.selectedPokemon.data,
);

export const selectSelectedPokemonLoading = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.selectedPokemon.loading,
);

export const selectSelectedPokemonLoaded = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.selectedPokemon.loaded,
);
// End selected pokemon

// Mix
export const selectPaginationStateAndDetailsListLoaded = createSelector(
  selectPaginationState,
  selectPokemonsDetailsListLoaded,
  (pagination, detailListLoaded) => ({
    pagination,
    detailListLoaded,
  }),
);
