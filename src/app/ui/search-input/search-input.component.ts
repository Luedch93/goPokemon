import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { saveFilter } from "src/app/actions/load.actions";
import { Observable } from "rxjs";

@Component({
  selector: "search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
})
export class SearchInputComponent implements OnInit {
  public value = "";
  filter$!: Observable<string>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.filter$ = this.store.pipe(select("filter"));
    this.filter$.subscribe((filter) => {
      this.value = filter;
    });
  }

  keyUp(event: any) {
    this.store.dispatch(saveFilter({ text: event }));
  }

  cleanFilter() {
    this.value = "";
    this.store.dispatch(saveFilter({ text: "" }));
  }
}
