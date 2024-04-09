import { Component, Input } from "@angular/core";

import { Stat } from "src/app/types/PokemonDetailsResponse";

@Component({
  selector: "stat-chart",
  templateUrl: "./stat-chart.component.html",
  styleUrls: ["./stat-chart.component.scss"],
})
export class StatChartComponent {
  @Input() stats!: Stat[];
}
