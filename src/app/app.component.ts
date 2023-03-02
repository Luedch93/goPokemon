import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";

import { loadPokemons } from "./actions/load.actions";
import { PokemonService } from "./services/pokemon.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private pokemonService: PokemonService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
  }
}
