import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PokemonListComponent } from "./pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonDetailComponent } from "./pokemons/components/pokemon-detail/pokemon-detail.component";

const routes: Routes = [
  { path: "", component: PokemonListComponent },
  { path: "pokemon/:name", component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
