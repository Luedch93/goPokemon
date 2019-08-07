import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { clickPokemon } from 'src/app/actions/load.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons$: Observable<any>;
  pokemons: any[];

  constructor(private store: Store<any>, private router: Router) {
    this.pokemons$ = store.pipe(select('pokemons'));

    this.pokemons$.subscribe(res => {
      this.pokemons = res;
    }, err => {
      console.error(err);
    });
  }

  ngOnInit() {

  }

  public showDetail(pokemon) {
    this.store.dispatch(clickPokemon({pokemon}));
    this.router.navigate(['pokemon', pokemon.name]);
  }
}
