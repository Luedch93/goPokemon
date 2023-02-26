import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { clickPokemon } from "src/app/actions/load.actions";
import { PokemonListResponse } from "src/app/types/PokemonListResponse";
import { Pagination } from "src/app/types/Pagination";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent {
  pokemons$: Observable<PokemonListResponse> = this.store.pipe(
    select("pokemons")
  );
  pagination$: Observable<Pagination> = this.store.pipe(select("pagination"));

  constructor(private store: Store<any>, private router: Router) {}

  public showDetail(pokemon: any) {
    this.store.dispatch(clickPokemon({ pokemon }));
    return this.router.navigate(["pokemon", pokemon.name]);
  }
}
