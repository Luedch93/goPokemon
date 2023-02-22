import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "detail-card",
  templateUrl: "./detail-card.component.html",
  styleUrls: ["./detail-card.component.scss"],
})
export class DetailCardComponent implements OnInit {
  @Input() pokemon: any;
  types!: any[];

  constructor() {}

  ngOnInit() {
    this.types = this.pokemon.types.map((type: any) => {
      return type.type.name;
    });
  }
}
