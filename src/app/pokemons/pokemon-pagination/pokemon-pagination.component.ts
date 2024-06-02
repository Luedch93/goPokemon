import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { newPage } from "src/app/store/actions/load.actions";
import { selectPaginationState } from "src/app/store/selectors/pagination.selectors";
import { State } from "src/app/types/State";
import { ButtonDirective } from "src/app/ui/button/button.directive";

@Component({
  selector: "app-pokemon-pagination",
  standalone: true,
  imports: [AsyncPipe, ButtonDirective],
  templateUrl: "./pokemon-pagination.component.html",
  styleUrl: "./pokemon-pagination.component.scss",
})
export class PokemonPaginationComponent {
  private readonly state = inject(Store<State>);
  numberOfPages$ = this.state.select(selectPaginationState).pipe(
    map(({ total, limit }) => {
      const numberOfPages = Math.ceil(total / limit);
      return Array.from({ length: numberOfPages }, (_, i) => i + 1);
    })
  );

  pageSelected(pageNumber: number) {
    this.state.dispatch(newPage({ payload: pageNumber }));
  }
}
