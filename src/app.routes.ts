import { Routes } from "@angular/router";

import { PokemonDetailComponent } from "./app/pokemons/pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./app/pokemons/pokemon-list/pokemon-list.component";

export const routes: Routes = [
  { path: "", component: PokemonListComponent },
  {
    path: "pokemon",
    loadChildren: async () =>
      (await import("./app/pokemons/pokemon-detail/pokemon-detail.routes"))
        .routes,
  },
];
