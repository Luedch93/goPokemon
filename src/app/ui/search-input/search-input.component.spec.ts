import {
  TestBed,
  fakeAsync,
  tick,
  ComponentFixture,
  async,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";
import { By } from "@angular/platform-browser";

import { SearchInputComponent } from "./search-input.component";

describe("searchInput", () => {
  let comp: SearchInputComponent;
  let store: MockStore<any>;
  let fixture: ComponentFixture<SearchInputComponent>;
  const initialState: any = { filter: "" };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchInputComponent],
      providers: [SearchInputComponent, provideMockStore(initialState)],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({ filter: "" });
    fixture = TestBed.createComponent(SearchInputComponent);
    comp = TestBed.get(SearchInputComponent);
  });

  it("should be created", () => {
    expect(comp).toBeDefined();
  });

  it("should clear the text from the input", fakeAsync(() => {
    store.setState({ filter: "TEST" });
    comp.ngOnInit();
    expect(comp.filterField).toBe("TEST");
    comp.cleanFilter();
    expect(comp.filterField).toBe("");
  }));

  it("should match the input value with the component", fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      store.setState({ filter: "pikachu" });
      tick();
      fixture.detectChanges();
      comp.ngOnInit();
      comp.keyUp("pikachu");
      const inputEl = fixture.debugElement.query(By.css("input")).nativeElement;
      inputEl.dispatchEvent(new Event("input"));
      tick();
      fixture.detectChanges();
      expect(comp.filterField).toBe("pikachu");
      expect(inputEl.value).toBe("pikachu");
    });
  }));
});
