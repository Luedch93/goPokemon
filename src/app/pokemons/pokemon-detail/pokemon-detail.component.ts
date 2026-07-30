import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { Observable } from "rxjs";
import { finalize, take } from "rxjs/operators";

import { State } from "../../types/State";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { FetchService } from "../../services/fetch.service";
import { DetailCardComponent } from "src/app/ui/detail-card/detail-card.component";
import { NotFoundCardComponent } from "src/app/ui/not-found-card/not-found-card.component";
import { selectSelectedPokemonData } from "src/app/store/selectors/pokemons.selectors";

@Component({
    selector: "app-pokemon-detail",
    templateUrl: "./pokemon-detail.component.html",
    styleUrls: ["./pokemon-detail.component.scss"],
    imports: [RouterLink, DetailCardComponent, NotFoundCardComponent]
})
export class PokemonDetailComponent {
  private store = inject<Store<State>>(Store);
  private service = inject(FetchService);
  private route = inject(ActivatedRoute);

  pokemonSelected$!: Observable<PokemonDetailsResponse | undefined>;
  pokemon?: PokemonDetailsResponse;
  loading = true;

  constructor() {
    this.pokemonSelected$ = this.store.select(selectSelectedPokemonData);
    const pokemonName = this.route.snapshot.paramMap.get("name") ?? "";

    this.pokemonSelected$
      .pipe(takeUntilDestroyed())
      .subscribe((pokemonSelected) => {
        if (pokemonSelected) {
          this.pokemon = pokemonSelected;
          this.loading = false;
        }
        if (!this.pokemon) {
          this.service
            .getPokemonDetailsByName(pokemonName)
            .pipe(
              take(1),
              finalize(() => (this.loading = false)),
            )
            .subscribe(
              (pokemon) => {
                this.pokemon = pokemon;
              },
              (err) => {
                console.error(err);
              },
            );
        }
      });
  }
}
