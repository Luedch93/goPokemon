import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { PokemonState, State } from "../../types/State";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { FetchService } from "src/app/services/fetch.service";
import { finalize, take } from "rxjs/operators";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
})
export class PokemonDetailComponent implements OnInit {
  pokemons$!: Observable<PokemonState>;
  pokemon?: PokemonDetailsResponse;
  pokemonName!: string;
  loading = true;

  constructor(
    private store: Store<State>,
    private service: FetchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pokemons$ = this.store.pipe(select("pokemons"));
    this.pokemonName = this.route.snapshot.paramMap.get("name") ?? "";

    this.pokemons$.subscribe((res) => {
      this.pokemon = res.selectedPokemon;
      if (!this.pokemon) {
        this.service
          .getPokemonDetailsByName(this.pokemonName)
          .pipe(
            take(1),
            finalize(() => (this.loading = false))
          )
          .subscribe(
            (pokemon) => {
              this.pokemon = pokemon;
            },
            (err) => {
              console.error(err);
            }
          );
      }
    });
  }
}
