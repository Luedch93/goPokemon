import { Component, Input } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { PokemonDetailsResponse } from "src/app/types/PokemonDetailsResponse";
import { NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { SkeletonSquareComponent } from "../skeletons/skeleton-square/skeleton-square.component";

@Component({
  selector: "poke-card",
  templateUrl: "./poke-card.component.html",
  styleUrls: ["./poke-card.component.scss"],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("500ms", style({ opacity: 0 })),
      ]),
    ]),
  ],
  imports: [TitleCasePipe, NgOptimizedImage, SkeletonSquareComponent],
  standalone: true,
})
export class PokeCardComponent {
  @Input() pokemon!: PokemonDetailsResponse;
  @Input() loading!: boolean;
}
