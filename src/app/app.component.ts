import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pokemons$: Observable<any>;
  nextUrl$: Observable<string>;
  previousUrl$: Observable<string>;

  constructor(private store: Store<any>, private service: PokemonService) {
    this.pokemons$ = store.pipe(select('pokemons'));
    this.nextUrl$ = store.pipe(select('next'));
    this.previousUrl$ = store.pipe(select('previous'));

  }

  ngOnInit() {
    this.pokemons$.subscribe(res => {
      console.log('POKEMONS', res);
    });

    this.nextUrl$.subscribe(res => {
      console.log('next', res);
    });


    this.previousUrl$.subscribe(res => {
      console.log('previous', res);
    });
  }
}
