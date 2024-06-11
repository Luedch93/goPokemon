import { AsyncPipe } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { PaginationHelperService } from "src/app/services/pagination-helper.service";
import {
  loadPaginatedPokemons,
  newPage,
} from "src/app/store/actions/load.actions";
import {
  selectPaginationPage,
  selectPaginationState,
} from "src/app/store/selectors/pagination.selectors";
import { Pagination } from "src/app/types/Pagination";
import { State } from "src/app/types/State";
import { ButtonDirective } from "src/app/ui/button/button.directive";

@Component({
  selector: "app-pokemon-pagination",
  standalone: true,
  imports: [AsyncPipe, ButtonDirective],
  providers: [PaginationHelperService],
  templateUrl: "./pokemon-pagination.component.html",
  styleUrl: "./pokemon-pagination.component.scss",
})
export class PokemonPaginationComponent implements OnInit {
  numberOfPages$!: Observable<number[]>;
  currentPage$!: Observable<number>;
  paginationState$!: Observable<Pagination>;
  private readonly state = inject(Store<State>);
  private readonly paginationHelper = inject(PaginationHelperService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.numberOfPages$ = this.state
      .select(selectPaginationState)
      .pipe(
        map(({ total, limit, page }) =>
          this.paginationHelper.getPages(total, limit, page),
        ),
      );
    this.currentPage$ = this.state.select(selectPaginationPage);
    this.paginationState$ = this.state.select(selectPaginationState);
  }

  pageSelected(pageNumber: number) {
    this.state.dispatch(newPage({ payload: pageNumber }));
    this.router.navigate([""], { queryParams: { page: pageNumber } });
    this.paginationState$.pipe(take(1)).subscribe((pagination) => {
      this.state.dispatch(loadPaginatedPokemons({ payload: pagination }));
    });
  }
}
