import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-square-animation",
  templateUrl: "./square-animation.component.html",
  styleUrls: ["./square-animation.component.scss"],
  imports: [NgStyle],
  standalone: true,
})
export class SquareAnimationComponent {
  @Input() width!: string;
  @Input() heigth!: string;
  @Input() color!: string;
  @Input() position!: string;
  @Input() delay!: string;

  constructor() {}
}
