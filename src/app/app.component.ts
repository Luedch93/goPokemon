import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";

import { Store } from "@ngrx/store";

import { debounceTime } from "rxjs/operators";

import {
  loadPaginatedPokemons,
  loadPokemons,
  newPage,
} from "./store/actions/load.actions";
import { SquareAnimationComponent } from "./ui/square-animation/square-animation.component";
import { Pagination } from "./types/Pagination";
import { State } from "./types/State";
import { selectPaginationState } from "./store/selectors/pagination.selectors";
import { selectPokemonsLoading } from "./store/selectors/pokemons.selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [SquareAnimationComponent, RouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  private store: Store<State> = inject(Store);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());

    this.activatedRoute.queryParams.subscribe(({ page }) => {
      if (!page) return;
      this.store.dispatch(newPage({ payload: Number.parseInt(page, 10) }));
    });

    this.store
      .select(selectPaginationState)
      .pipe(debounceTime(500))
      .subscribe((pagination: Pagination) =>
        this.store.dispatch(loadPaginatedPokemons({ payload: pagination })),
      );
  }
}
