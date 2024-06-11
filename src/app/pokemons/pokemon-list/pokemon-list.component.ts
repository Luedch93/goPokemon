import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AsyncPipe } from "@angular/common";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";

import {
  clickPokemon,
  loadPaginatedPokemons,
  loadPokemons,
  newFilter,
  newPage,
} from "../../store/actions/load.actions";
import { Pagination } from "../../types/Pagination";
import { PokemonState, State } from "../../types/State";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { SearchInputComponent } from "src/app/ui/search-input/search-input.component";
import { PokeCardComponent } from "src/app/ui/poke-card/poke-card.component";
import { PaginationComponent } from "src/app/ui/pagination/pagination.component";
import { NotFoundCardComponent } from "src/app/ui/not-found-card/not-found-card.component";
import {
  selectPaginationStateAndDetailsListLoaded,
  selectPokemonsDetailsListData,
  selectPokemonsDetailsListLength,
  selectPokemonsDetailsListLoaded,
  selectPokemonsDetailsListLoading,
  selectPokemonsFilter,
  selectPokemonsListData,
  selectPokemonsLoading,
  selectPokemonsState,
} from "src/app/store/selectors/pokemons.selectors";
import { selectPaginationState } from "src/app/store/selectors/pagination.selectors";
import { PokemonPaginationComponent } from "../pokemon-pagination/pokemon-pagination.component";

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
    PokemonPaginationComponent,
  ],
  standalone: true,
})
export class PokemonListComponent implements OnInit {
  private readonly store = inject(Store<State>);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  pokemonList$: Observable<string[]> = this.store.select(
    selectPokemonsListData,
  );
  pokemonInputFilter$: Observable<string> =
    this.store.select(selectPokemonsFilter);
  pokemonDetailedPaginatedListLoading$: Observable<boolean> = this.store.select(
    selectPokemonsDetailsListLoading,
  );
  pokemonDetailedPaginatedList$: Observable<PokemonDetailsResponse[]> =
    this.store.select(selectPokemonsDetailsListData);
  pokemonDetailedPaginatedListLength$: Observable<number> = this.store.select(
    selectPokemonsDetailsListLength,
  );
  pokemonDetailedPaginatedListLoaded$: Observable<boolean> = this.store.select(
    selectPokemonsDetailsListLoaded,
  );
  pagination$: Observable<Pagination> = this.store.select(
    selectPaginationState,
  );

  ngOnInit(): void {
    this.pokemonList$
      .pipe(filter((pokemons) => pokemons.length === 0))
      .subscribe(() => {
        this.store.dispatch(loadPokemons());
      });

    this.activatedRoute.queryParams.subscribe(({ page }) => {
      if (!page) return;

      this.store.dispatch(newPage({ payload: Number.parseInt(page, 10) }));
    });

    this.store
      .select(selectPaginationStateAndDetailsListLoaded)
      .pipe(filter(({ detailListLoaded }) => detailListLoaded === false))
      .subscribe(({ pagination }) => {
        this.store.dispatch(loadPaginatedPokemons({ payload: pagination }));
      });
  }

  public showDetail(pokemon: PokemonDetailsResponse) {
    this.store.dispatch(clickPokemon({ payload: pokemon }));
    return this.router.navigate(["pokemon", pokemon.name]);
  }

  handleFilter(value: string) {
    this.store.dispatch(newFilter({ payload: value }));
  }
}
