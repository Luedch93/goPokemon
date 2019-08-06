import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveFilter } from 'src/app/actions/load.actions';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  public value = '';

  constructor(private store: Store<any>) {}

  keyUp(event) {
    this.store.dispatch(saveFilter({text: event}));
  }

  cleanFilter() {
    this.value = '';
    this.store.dispatch(saveFilter({text: ''}));
  }

}
