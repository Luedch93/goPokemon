import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AsyncPipe } from "@angular/common";

import { Store } from "@ngrx/store";
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
import { SearchInputComponent } from "src/app/ui/search-input/search-input.component";
import { PokeCardComponent } from "src/app/ui/poke-card/poke-card.component";
import { PaginationComponent } from "src/app/ui/pagination/pagination.component";
import { NotFoundCardComponent } from "src/app/ui/not-found-card/not-found-card.component";
import { selectPokemonsState } from "src/app/store/selectors/pokemons.selectors";
import { selectPaginationState } from "src/app/store/selectors/pagination.selectors";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
  imports: [
    AsyncPipe,
    SearchInputComponent,
    PokeCardComponent,
    PaginationComponent,
    NotFoundCardComponent,
  ],
  standalone: true,
})
export class PokemonListComponent {
  pokemons$: Observable<PokemonState> = this.store.select(selectPokemonsState);
  pagination$: Observable<Pagination> = this.store.select(
    selectPaginationState
  );

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
