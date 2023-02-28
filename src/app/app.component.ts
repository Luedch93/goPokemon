import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { PokemonService } from "./services/pokemon.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private pokemonService: PokemonService) {}
}
