import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideImgixLoader } from "@angular/common";
import { provideAnimations } from "@angular/platform-browser/animations";
import { isDevMode } from "@angular/core";

import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { AppComponent } from "./app/app.component";
import { routes } from "./app.routes";
import {
  loadReducer,
  paginationReducer,
} from "./app/store/reducers/load.reducers";
import { PokemonsEffects } from "./app/store/effects/pokemon.effects";

const POKEMON_SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const extraProviders = [];

if (isDevMode()) {
  extraProviders.push(
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  );
}

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
    ...extraProviders,
  ],
});
