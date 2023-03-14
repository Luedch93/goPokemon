import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { loadPaginatedPokemons } from "../store/actions/load.actions";
import { Pagination } from "../types/Pagination";
import { State } from "../types/State";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pagination$: Observable<Pagination>;

  constructor(private store: Store<State>) {
    this.pagination$ = store.pipe<Pagination>(select("pagination"));

    this.pagination$.subscribe((pagination: Pagination) =>
      this.store.dispatch(loadPaginatedPokemons({ payload: pagination }))
    );
  }
}
