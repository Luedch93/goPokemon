import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { currentUrlSave, saveFilter } from '../../actions/load.actions';
@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  nextUrl$: Observable<string>;
  previousUrl$: Observable<string>;
  nextUrl: string;
  previousUrl: string;

  constructor(private store: Store<any>) {
    this.nextUrl$ = store.pipe(select('next'));
    this.previousUrl$ = store.pipe(select('previous'));
  }

  ngOnInit() {
    this.nextUrl$.subscribe(res => {
      this.nextUrl = res;
    })
    this.previousUrl$.subscribe(res => {
      this.previousUrl = res;
    });
  }

  goNext() {
    this.store.dispatch(currentUrlSave({ url: this.nextUrl}));
  }

  goPrevious() {
    this.store.dispatch(currentUrlSave({ url: this.previousUrl}));
  }

}
