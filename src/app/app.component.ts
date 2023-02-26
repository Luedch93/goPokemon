import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { PokemonService } from "./services/pokemon.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.store.dispatch({ type: "[Pokemon List] Load Pokemons" });
  }
}
