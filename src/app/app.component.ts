import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { SquareAnimationComponent } from "./ui/square-animation/square-animation.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SquareAnimationComponent, RouterOutlet],
})
export class AppComponent {}
