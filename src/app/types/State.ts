import { PokemonDetailsResponse } from "./PokemonDetailsResponse";

export type PokemonState = {
  total: number;
  pokemons: string[];
  detailedPaginatedList: PokemonDetailsResponse[];
  loading: boolean;
  filter: string;
};
