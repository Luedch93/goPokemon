import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  nextUrl$: Observable<string>;
  previous$: Observable<string>;
  nextUrl: string;

  constructor(private store: Store<any>) {
    this.nextUrl$ = store.pipe(select('next'));
  }

  ngOnInit() {
    this.nextUrl$.subscribe(res => {
      this.nextUrl = res;
    })
  }

}
