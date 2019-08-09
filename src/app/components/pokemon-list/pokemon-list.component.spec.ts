import { TestBed, fakeAsync, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PokemonListComponent } from "./pokemon-list.component";
import { SearchInputComponent } from 'src/app/ui/search-input/search-input.component';
import { PokeCardComponent } from 'src/app/ui/poke-card/poke-card.component';
import { PaginationComponent } from 'src/app/ui/pagination/pagination.component';
import { NotFoundCardComponent } from 'src/app/ui/not-found-card/not-found-card.component';

import { pokemons, pokemon } from '../../testing/data/pokemons';
import { routes, TestComponent } from '../../testing/routes/routes';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let comp: PokemonListComponent;
  let store: MockStore<any>;
  let fixture: ComponentFixture<PokemonListComponent>;
  const initialStatePokemons: any = pokemons;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        PokemonListComponent,
        SearchInputComponent,
        PokeCardComponent,
        PaginationComponent,
        NotFoundCardComponent,
        TestComponent
      ],
      providers: [
        PokemonListComponent,
        provideMockStore(initialStatePokemons)
      ]
    })
    .overrideComponent(
      SearchInputComponent,
      {
        set: {
          template: '<h1>search</h1>'
        }
      }
    )
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    store = TestBed.get<Store<any>>(Store);
    store.setState(initialStatePokemons);
    comp = TestBed.get(PokemonListComponent);
  })

  it('Should load pokemons', () => {
    comp.ngOnInit();
    expect(comp.pokemons.length).toBeGreaterThan(0);
  });

  it('Should navigate to detail page', fakeAsync(() => {
    const router: Router = TestBed.get(Router);
    comp.ngOnInit();
    comp.showDetail(pokemon)
    .then(() => {
      expect(router.url).toEqual('/pokemon/flareon');
    });
  }));

  it('Should display a not found card if there is no pokemons', fakeAsync(() => {
    store.setState({pokemons: []});
    comp.ngOnInit();
    expect(comp.pokemons.length).toEqual(0);
    fixture.detectChanges();
    let div = fixture.debugElement.query(By.css('#container'));
    expect(div.nativeElement.innerText).toEqual('Pokemon not found');
  }));
});
