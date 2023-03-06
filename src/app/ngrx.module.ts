import { InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";

import { PokemonsEffects } from "./effects/pokemon.effects";
import {
  loadReducer,
  nextReducer,
  paginationReducer,
  pokemonReducer,
  previousReducer,
  saveReducer,
  currentUrlReducer,
} from "./reducers/load.reducers";

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>(
  "root reducer"
);

@NgModule({
  exports: [StoreModule, EffectsModule],
  imports: [
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([PokemonsEffects]),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useValue: {
        pokemons: loadReducer,
        filter: saveReducer,
        previous: previousReducer,
        next: nextReducer,
        apiURL: currentUrlReducer,
        pokemon: pokemonReducer,
        pagination: paginationReducer,
      },
    },
  ],
})
export class NgrxModule {}
