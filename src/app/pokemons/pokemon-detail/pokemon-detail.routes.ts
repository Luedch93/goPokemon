import { Route } from "@angular/router";
import { PokemonDetailComponent } from "./pokemon-detail.component";

export const routes: Route[] = [
  {
    path: "",
    redirectTo: ":name",
    pathMatch: "full",
  },
  {
    path: ":name",
    component: PokemonDetailComponent,
  },
];
