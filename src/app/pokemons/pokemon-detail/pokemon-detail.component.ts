import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ActivatedRoute, RouterLink } from "@angular/router";

import { Observable } from "rxjs";
import { finalize, take } from "rxjs/operators";

import { PokemonState, State } from "../../types/State";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { FetchService } from "../../services/fetch.service";
import { DetailCardComponent } from "src/app/ui/detail-card/detail-card.component";
import { NotFoundCardComponent } from "src/app/ui/not-found-card/not-found-card.component";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
  imports: [RouterLink, DetailCardComponent, NotFoundCardComponent],
  standalone: true,
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
