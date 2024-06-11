import { createFeatureSelector, createSelector } from "@ngrx/store";

import { PokemonState } from "src/app/types/State";

export const selectPokemonsState =
  createFeatureSelector<PokemonState>("pokemons");

export const selectPokemonsTotal = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.total,
);

export const selectPokemonsList = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.pokemons,
);

export const selectPokemonsDetailsList = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.detailedPaginatedList,
);

export const selectPokemonsLoading = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.loading,
);

export const selectPokemonsFilter = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.filter,
);

export const selectPokemonsShowPagination = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.showPagination,
);

export const selectPokemonSelected = createSelector(
  selectPokemonsState,
  (pokemonState) => pokemonState.selectedPokemon,
);

export const selectLoadingAndPokemonSelected = createSelector(
  selectPokemonsLoading,
  selectPokemonSelected,
  (loading, pokemonSelected) => ({
    loading,
    pokemonSelected,
  }),
);
