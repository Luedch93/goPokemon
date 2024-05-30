import { Component, Input } from "@angular/core";

@Component({
  selector: "app-skeleton-square",
  standalone: true,
  imports: [],
  templateUrl: "./skeleton-square.component.html",
  styleUrl: "./skeleton-square.component.scss",
})
export class SkeletonSquareComponent {
  @Input({ required: true }) height!: string;
  @Input({ required: true }) width!: string;
}
