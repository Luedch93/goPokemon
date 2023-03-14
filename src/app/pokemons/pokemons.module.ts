import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";

import { UiModule } from "../ui/ui.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, UiModule, RouterModule],
  declarations: [PokemonListComponent, PokemonDetailComponent],
})
export class PokemonModule {}
