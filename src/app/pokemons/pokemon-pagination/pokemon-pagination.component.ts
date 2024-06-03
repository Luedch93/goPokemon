import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";

import { Store } from "@ngrx/store";

import { map } from "rxjs/operators";

import { PaginationHelperService } from "src/app/services/pagination-helper.service";
import { newPage } from "src/app/store/actions/load.actions";
import {
  selectPaginationPage,
  selectPaginationState,
} from "src/app/store/selectors/pagination.selectors";
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
export class PokemonPaginationComponent {
  private readonly state = inject(Store<State>);
  private readonly paginationHelper = inject(PaginationHelperService);

  numberOfPages$ = this.state
    .select(selectPaginationState)
    .pipe(
      map(({ total, limit, page }) =>
        this.paginationHelper.getPages(total, limit, page),
      ),
    );
  currentPage$ = this.state.select(selectPaginationPage);

  pageSelected(pageNumber: number) {
    this.state.dispatch(newPage({ payload: pageNumber }));
  }
}
