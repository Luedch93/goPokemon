import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { loadReducer, saveReducer, previousReducer, nextReducer, currentUrlReducer, pokemonReducer } from '../reducers/load.reducers';

describe('PokemonService', () => {

  let service: PokemonService;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          pokemons: loadReducer,
          filter: saveReducer,
          previous: previousReducer,
          next: nextReducer,
          apiURL: currentUrlReducer,
          pokemon: pokemonReducer }
        )
      ]
    });
    service = TestBed.get(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of pokemons', (done: DoneFn) => {
    service.getPokemons().then((res: any) => {
      expect(res.results).toBeTruthy();
      expect(res.results.length).toBe(20);
      done();
    });
  });

  it('should return a pokemon detail', (done: DoneFn) => {
    service.getPokemonDetail('flareon').then((res: any) => {
      expect(res.length).toEqual(1);
      expect(res[0].name).toEqual('flareon');
      done();
    });
  });
  it('should return pokemons with extra data', (done: DoneFn) => {
    service.getPokemonsDetailed().then((res: any[]) => {
      expect(res.length).toBe(20);
      expect(res[0].sprites).toBeTruthy();
      expect(res[0].stats).toBeTruthy();
      expect(res[0].stats.length).toBeGreaterThan(0);
      expect(res[0].weight).toBeGreaterThanOrEqual(0);
      expect(res[0].height).toBeGreaterThanOrEqual(0);
      expect(res[0].types).toBeTruthy();
      done();
    });
  });
  it('should filter pokemon by name', (done: DoneFn) => {
    service.filterPokemon('pikachu').then((res: any) => {
      expect(res[0].name).toBe('pikachu');
      expect(res[0].weight).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('should filter all the pokemons if filter is empty', (done: DoneFn) => {
    service.filterPokemon('').then((res: any) => {
      expect(res[0].name).toBeTruthy();
      done();
    });
  });
});
