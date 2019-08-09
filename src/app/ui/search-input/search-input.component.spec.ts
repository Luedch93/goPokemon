import { TestBed, fakeAsync, tick, ComponentFixture, async } from "@angular/core/testing";
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SearchInputComponent } from './search-input.component';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';


describe('searchInput', () => {
  let comp: SearchInputComponent;
  let store: MockStore<any>;
  let fixture: ComponentFixture<SearchInputComponent>;
  const initialState: any = {filter: ''};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        SearchInputComponent
      ],
      providers: [
        SearchInputComponent,
        provideMockStore(initialState)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    comp = TestBed.get(SearchInputComponent);
    store = TestBed.get(Store);
    store.setState({filter: ''});
    fixture = TestBed.createComponent(SearchInputComponent);
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should clear the text from the input', fakeAsync(() => {
    store.setState({filter: 'TEST'});
    comp.ngOnInit();
    expect(comp.value).toBe('TEST');
    comp.cleanFilter();
    expect(comp.value).toBe('');
  }));

  it('should change the state for every keyup event', () => {
    // TODO: finish this test.
  })
});
