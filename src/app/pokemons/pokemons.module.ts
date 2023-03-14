import { NgModule } from "@angular/core";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
})
export class PokemonModule {}
