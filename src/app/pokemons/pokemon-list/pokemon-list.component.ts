import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import {
  clickPokemon,
  newFilter,
  nextPage,
  previousPage,
} from "../../store/actions/load.actions";
import { Pagination } from "../../types/Pagination";
import { PokemonState, State } from "../../types/State";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent {
  pokemons$: Observable<PokemonState> = this.store.pipe(select("pokemons"));
  pagination$: Observable<Pagination> = this.store.pipe(select("pagination"));

  constructor(private store: Store<State>, private router: Router) {}

  public showDetail(pokemon: PokemonDetailsResponse) {
    this.store.dispatch(clickPokemon({ payload: pokemon }));
    return this.router.navigate(["pokemon", pokemon.name]);
  }

  handleFilter(value: string) {
    this.store.dispatch(newFilter({ payload: value }));
  }

  handleNext() {
    this.store.dispatch(nextPage());
  }

  handlePrevious() {
    this.store.dispatch(previousPage());
  }
}
