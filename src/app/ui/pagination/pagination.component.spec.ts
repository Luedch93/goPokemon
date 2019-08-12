import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PaginationComponent } from "./pagination.component";
import { Store } from '@ngrx/store';

describe('PaginationComponent', () => {
  let comp: PaginationComponent;
  let store: MockStore<any>;
  const initialState: any = {next: '', previous: '', apiURL: ''};


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent
      ],
      providers: [
        PaginationComponent,
        provideMockStore(initialState)
      ]
    });
    store = TestBed.get(Store);
    comp = TestBed.get(PaginationComponent);
  });

  it('should listen to next and previous subscriptions', () => {
    store.setState({next: 'nextUrl', previous: 'previousUrl'});
    comp.ngOnInit();
    expect(comp.nextUrl).toBe('nextUrl');
    expect(comp.previousUrl).toBe('previousUrl');
  });

});
