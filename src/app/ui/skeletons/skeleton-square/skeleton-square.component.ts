import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-skeleton-square",
  imports: [],
  templateUrl: "./skeleton-square.component.html",
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: "./skeleton-square.component.scss",
})
export class SkeletonSquareComponent {
  @Input({ required: true }) height!: string;
  @Input({ required: true }) width!: string;
}
