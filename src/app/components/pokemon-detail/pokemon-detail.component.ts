import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon$: Observable<any>;
  pokemon: any;
  pokemonName: string;

  constructor(private store: Store<any>, private service: PokemonService, private route: ActivatedRoute) {
    this.pokemon$ = this.store.pipe(select('pokemon'));
    this.pokemonName = this.route.snapshot.paramMap.get('name');


    this.pokemon$.subscribe(res => {
      this.pokemon = res;
      if ( this.pokemon == null ) {
        this.service.getPokemonDetail(this.pokemonName).then(pokemon => {
          this.pokemon = pokemon[0];
        });
      }
    });
  }

  ngOnInit() {
  }

}
