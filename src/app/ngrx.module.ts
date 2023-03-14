import { InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";

import { PokemonsEffects } from "./effects/pokemon.effects";
import { loadReducer, paginationReducer } from "./reducers/load.reducers";

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
        pagination: paginationReducer,
      },
    },
  ],
})
export class NgrxModule {}
