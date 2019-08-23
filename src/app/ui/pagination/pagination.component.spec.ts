import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PaginationComponent } from "./pagination.component";
import { Store, StoreModule, select } from '@ngrx/store';
import { previousReducer, nextReducer, currentUrlReducer } from 'src/app/reducers/load.reducers';
import { pipe } from 'rxjs';

describe('PaginationComponent', () => {
  let comp: PaginationComponent;
  let store: MockStore<{ next: string, previous: string, apiURL: string }>;
  const initialState: any = {next: '', previous: '', apiURL: ''};


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
        previous: previousReducer,
        next: nextReducer,
        apiURL: currentUrlReducer })
      ],
      declarations: [
        PaginationComponent
      ],
      providers: [
        PaginationComponent
      ]
    });
    store = TestBed.get(Store);
    comp = TestBed.get(PaginationComponent);
  });

  it('should listen to next and previous subscriptions', () => {
    comp.ngOnInit();
    comp.nextUrl = 'nextUrl.com';
    comp.goNext();
    comp.previousUrl = 'prevUrl.com';
    comp.goPrevious();
    expect(comp.nextUrl).toBe('nextUrl.com');
    expect(comp.previousUrl).toBe('prevUrl.com');
  });

  it('should dispatch a new apiURL when click next', (done: DoneFn) => {
    comp.ngOnInit();
    comp.nextUrl = 'newUrl.com';
    comp.goNext();
    store.pipe(select('apiURL')).subscribe(res => {
      expect(res).toBe('newUrl.com');
      done();
    });
  });

  it('should dispatch a new apiURL when click previous', (done: DoneFn) => {
    comp.ngOnInit();
    comp.previousUrl = 'newUrl.com';
    comp.goPrevious();
    store.pipe(select('apiURL')).subscribe(res => {
      expect(res).toBe('newUrl.com');
      done();
    });
  });

});
