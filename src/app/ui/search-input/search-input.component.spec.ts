import {
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture,
  waitForAsync,
} from "@angular/core/testing";

import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { SearchInputComponent } from "./search-input.component";

describe("searchInput", () => {
  let comp: SearchInputComponent;
  let store: MockStore;
  let fixture: ComponentFixture<SearchInputComponent>;
  const initialState = { filter: "" };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SearchInputComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.setState({ filter: "" });
    fixture = TestBed.createComponent(SearchInputComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(comp).toBeDefined();
  });

  it("should clear the text from the input", fakeAsync(() => {
    comp.value = "TEST";
    comp.ngOnInit();
    tick(500);
    expect(comp.filterField.value).toBe("TEST");
    comp.cleanFilter();
    tick(500);
    expect(comp.filterField.value).toBe("");
  }));
});
