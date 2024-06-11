import { AsyncPipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

import {
  selectPokemonsDetailsListLoading,
  selectPokemonsLoading,
} from "src/app/store/selectors/pokemons.selectors";
import { State } from "src/app/types/State";

@Component({
  selector: "search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
  imports: [ReactiveFormsModule, AsyncPipe],
  standalone: true,
})
export class SearchInputComponent implements OnInit {
  state = inject(Store<State>);
  @Input() value = "";
  @Output() newFilter = new EventEmitter<string>();
  filterField!: FormControl;
  filter$!: Observable<string>;
  loading$ = this.state
    .select(selectPokemonsDetailsListLoading)
    .pipe(map((isLoading) => ({ isLoading })));

  ngOnInit() {
    this.filterField = new FormControl<string>(this.value, {
      nonNullable: true,
    });

    this.filterField.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => value.toLocaleLowerCase()),
      )
      .subscribe((value: string) => {
        this.newFilter.emit(value);
      });
  }

  cleanFilter() {
    this.filterField.setValue("");
  }
}
