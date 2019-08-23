import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { clickPokemon } from 'src/app/actions/load.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons$: Observable<any>;
  pokemons: any[];

  constructor(private store: Store<any>, private router: Router) {
  }

  ngOnInit() {
    this.pokemons$ = this.store.pipe(select('pokemons'));
    this.pokemons$.subscribe(res => {
      this.pokemons = res;
    }, err => {
      console.error(err);
    });
  };

  public showDetail(pokemon) {
    this.store.dispatch(clickPokemon({pokemon}));
    return this.router.navigate(['pokemon', pokemon.name]);
  }
}
