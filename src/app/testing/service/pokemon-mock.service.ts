import { PokemonService } from 'src/app/services/pokemon.service';

import { pokemon } from '../data/pokemons';

export const pokemonServiceMock: Partial<PokemonService> = {
  getPokemonDetail(name) {
    return new Promise((resolve, reject) => {
      resolve([pokemon]);
    });
  }
};
