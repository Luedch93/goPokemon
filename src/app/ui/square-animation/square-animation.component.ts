import { NgStyle } from "@angular/common";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-square-animation",
  templateUrl: "./square-animation.component.html",
  styleUrls: ["./square-animation.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgStyle],
})
export class SquareAnimationComponent {
  @Input() width!: string;
  @Input() heigth!: string;
  @Input() color!: string;
  @Input() position!: string;
  @Input() delay!: string;

  constructor() {}
}
