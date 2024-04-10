import { Component, Input } from "@angular/core";

import { Stat } from "src/app/types/PokemonDetailsResponse";
import { StatBarComponent } from "../stat-bar/stat-bar.component";

@Component({
  selector: "stat-chart",
  templateUrl: "./stat-chart.component.html",
  styleUrls: ["./stat-chart.component.scss"],
  imports: [StatBarComponent],
  standalone: true,
})
export class StatChartComponent {
  @Input() stats!: Stat[];
}
