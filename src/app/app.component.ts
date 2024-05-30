import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { Store, select } from "@ngrx/store";

import { Observable } from "rxjs";

import {
  loadPaginatedPokemons,
  loadPokemons,
} from "./store/actions/load.actions";
import { SquareAnimationComponent } from "./ui/square-animation/square-animation.component";
import { Pagination } from "./types/Pagination";
import { State } from "./types/State";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [SquareAnimationComponent, RouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  private pagination$!: Observable<Pagination>;
  private store: Store<State> = inject(Store);

  ngOnInit(): void {
    this.pagination$ = this.store.pipe<Pagination>(select("pagination"));
    this.store.dispatch(loadPokemons());
    this.pagination$.subscribe((pagination: Pagination) =>
      this.store.dispatch(loadPaginatedPokemons({ payload: pagination }))
    );
  }
}
