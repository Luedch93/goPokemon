import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetailCardComponent } from 'src/app/ui/detail-card/detail-card.component';
import { NotFoundCardComponent } from 'src/app/ui/not-found-card/not-found-card.component';
import { PokemonDetailComponent } from "./pokemon-detail.component";
import { TypeSlotComponent } from 'src/app/ui/type-slot/type-slot.component';
import { StatChartComponent } from 'src/app/ui/stat-chart/stat-chart.component';
import { StatBarComponent } from 'src/app/ui/stat-bar/stat-bar.component';
import { WeightHeightPipe } from 'src/app/pipes/weight-height.pipe';

import { pokemon } from '../../testing/data/pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';
import { pokemonServiceMock } from 'src/app/testing/service/pokemon-mock.service';

describe('DetailComponent', () => {
  let comp: PokemonDetailComponent;
  let store: MockStore<any>;
  const initialStatePokemon: any = { pokemon: null};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DetailCardComponent,
        NotFoundCardComponent,
        TypeSlotComponent,
        StatChartComponent,
        WeightHeightPipe,
        StatBarComponent
      ],
      providers: [
        PokemonDetailComponent,
        provideMockStore(initialStatePokemon),
        { provide: PokemonService, useValue: pokemonServiceMock}
      ]
    });

    store = TestBed.get<Store<any>>(Store);
    store.setState({pokemon});
    comp = TestBed.get(PokemonDetailComponent);
  });

  it('Should load a pokemon', () => {
    comp.ngOnInit();
    expect(comp.pokemon).toEqual(pokemon);
  });

  it('Should make a request if the state is empty', fakeAsync(() => {
    store.setState({pokemon: null});
    comp.ngOnInit();
    tick(1000);
    expect(comp.pokemon).toEqual(pokemon);
  }));
});
