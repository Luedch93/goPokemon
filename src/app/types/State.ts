import { Pagination } from "./Pagination";
import { PokemonDetailsResponse } from "./PokemonDetailsResponse";

export type PokemonState = {
  total: number;
  pokemons: string[];
  detailedPaginatedList: PokemonDetailsResponse[];
  loading: boolean;
  filter: string;
};

export interface State {
  pagination: Pagination;
  pokemons: PokemonState;
}
