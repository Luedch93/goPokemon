import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { clickPokemon, newFilter } from "../../actions/load.actions";
import { Pagination } from "../../types/Pagination";
import { PokemonState } from "../../types/State";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent {
  pokemons$: Observable<PokemonState> = this.store.pipe(select("pokemons"));
  pagination$: Observable<Pagination> = this.store.pipe(select("pagination"));

  constructor(private store: Store<any>, private router: Router) {}

  public showDetail(pokemon: any) {
    this.store.dispatch(clickPokemon({ pokemon }));
    return this.router.navigate(["pokemon", pokemon.name]);
  }

  handleFilter(value: string) {
    this.store.dispatch(newFilter({ payload: value }));
  }
}
