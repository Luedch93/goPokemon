import { Pagination } from "./Pagination";
import { PokemonDetailsResponse } from "./PokemonDetailsResponse";

export type PokemonState = {
  pokemons: {
    data: string[];
    total: number;
    loading: boolean;
    loaded: boolean;
  };
  detailedPaginatedList: {
    data: PokemonDetailsResponse[];
    loading: boolean;
    loaded: boolean;
  };
  filter: string;
  selectedPokemon: {
    data: PokemonDetailsResponse | undefined;
    loading: boolean;
    loaded: boolean;
  };
  showPagination: boolean;
};

export interface State {
  pagination: Pagination;
  pokemons: PokemonState;
}
