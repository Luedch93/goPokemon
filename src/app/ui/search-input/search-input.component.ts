import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

@Component({
  selector: "search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent implements OnInit {
  @Input() value = "";
  @Output() newFilter = new EventEmitter<string>();
  filterField!: FormControl;
  filter$!: Observable<string>;

  ngOnInit() {
    this.filterField = new FormControl<string>(this.value, {
      nonNullable: true,
    });

    this.filterField.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => value.toLocaleLowerCase())
      )
      .subscribe((value: string) => {
        this.newFilter.emit(value);
      });
  }

  cleanFilter() {
    this.filterField.setValue("");
  }
}
