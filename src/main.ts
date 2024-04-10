import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { AppComponent } from "./app/app.component";
import { routes } from "./app.routes";
import {
  loadReducer,
  paginationReducer,
} from "./app/store/reducers/load.reducers";
import { PokemonsEffects } from "./app/store/effects/pokemon.effects";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideImgixLoader } from "@angular/common";

// if (environment.production) {
//   enableProdMode();
// }
const POKEMON_SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideImgixLoader(POKEMON_SPRITES_URL),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({
      pokemons: loadReducer,
      pagination: paginationReducer,
    }),
    provideEffects([PokemonsEffects]),
  ],
});
