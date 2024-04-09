import { Component, OnInit, Input } from "@angular/core";
import {
  PokemonDetailsResponse,
  Type,
} from "src/app/types/PokemonDetailsResponse";

@Component({
  selector: "detail-card",
  templateUrl: "./detail-card.component.html",
  styleUrls: ["./detail-card.component.scss"],
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
