import { NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { WeightHeightPipe } from "src/app/pipes/weight-height.pipe";
import {
  PokemonDetailsResponse,
  Type,
} from "src/app/types/PokemonDetailsResponse";
import { StatChartComponent } from "../stat-chart/stat-chart.component";
import { TypeSlotComponent } from "../type-slot/type-slot.component";
import { StatBarComponent } from "../stat-bar/stat-bar.component";

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
  ],
  standalone: true,
})
export class DetailCardComponent implements OnInit {
  @Input() pokemon!: PokemonDetailsResponse;
  types!: Type[];

  constructor() {}

  ngOnInit() {
    this.types = this.pokemon.types.map((type: any) => {
      return type.type.name;
    });
  }
}
