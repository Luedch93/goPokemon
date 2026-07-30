import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Stat } from "src/app/types/PokemonDetailsResponse";
import { StatBarComponent } from "../stat-bar/stat-bar.component";

@Component({
  selector: "stat-chart",
  templateUrl: "./stat-chart.component.html",
  styleUrls: ["./stat-chart.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [StatBarComponent],
})
export class StatChartComponent {
  @Input() stats!: Stat[];
}
