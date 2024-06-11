import { NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";

import { WeightHeightPipe } from "src/app/pipes/weight-height.pipe";
import {
  PokemonDetailsResponse,
  Type,
} from "src/app/types/PokemonDetailsResponse";
import { StatChartComponent } from "../stat-chart/stat-chart.component";
import { TypeSlotComponent } from "../type-slot/type-slot.component";
import { SoundButtonComponent } from "../sound-button/sound-button.component";
import { SkeletonSquareComponent } from "../skeletons/skeleton-square/skeleton-square.component";

@Component({
  selector: "detail-card",
  templateUrl: "./detail-card.component.html",
  styleUrls: ["./detail-card.component.scss"],
  imports: [
    TitleCasePipe,
    NgOptimizedImage,
    WeightHeightPipe,
    StatChartComponent,
    TypeSlotComponent,
    StatChartComponent,
    SoundButtonComponent,
    SkeletonSquareComponent,
  ],
  standalone: true,
})
export class DetailCardComponent implements OnChanges {
  @Input({ required: true }) pokemon!: PokemonDetailsResponse;
  @Input({ required: true }) loading = false;
  types: Type[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const { pokemon } = changes;

    if (pokemon && pokemon.currentValue) {
      this.updateTypes();
    }
  }

  updateTypes() {
    this.types = this.pokemon.types.map((type: any) => {
      return type.type.name;
    });
  }
}
