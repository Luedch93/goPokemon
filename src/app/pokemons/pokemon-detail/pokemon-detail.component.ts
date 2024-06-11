import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { Observable } from "rxjs";
import { filter, finalize, take } from "rxjs/operators";

import { State } from "../../types/State";
import { PokemonDetailsResponse } from "../../types/PokemonDetailsResponse";
import { FetchService } from "../../services/fetch.service";
import { DetailCardComponent } from "src/app/ui/detail-card/detail-card.component";
import { NotFoundCardComponent } from "src/app/ui/not-found-card/not-found-card.component";
import { selectLoadingAndPokemonSelected } from "src/app/store/selectors/pokemons.selectors";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.scss"],
  imports: [RouterLink, DetailCardComponent, NotFoundCardComponent],
  standalone: true,
})
export class PokemonDetailComponent {
  loading$!: Observable<{
    loading: boolean;
    pokemonSelected: PokemonDetailsResponse | undefined;
  }>;
  pokemon?: PokemonDetailsResponse;
  loading = true;

  constructor(
    private store: Store<State>,
    private service: FetchService,
    private route: ActivatedRoute,
  ) {
    this.loading$ = this.store
      .select(selectLoadingAndPokemonSelected)
      .pipe(filter((response) => !response.loading));
    const pokemonName = this.route.snapshot.paramMap.get("name") ?? "";

    this.loading$.pipe(takeUntilDestroyed()).subscribe((res) => {
      console.log(res);

      if (res.pokemonSelected) {
        this.pokemon = res.pokemonSelected;
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
