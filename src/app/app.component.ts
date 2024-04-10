import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { Store } from "@ngrx/store";

import { loadPokemons } from "./store/actions/load.actions";
import { PokemonService } from "./services/pokemon.service";
import { SquareAnimationComponent } from "./ui/square-animation/square-animation.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [SquareAnimationComponent, RouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  constructor(private pokemonService: PokemonService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
  }
}
