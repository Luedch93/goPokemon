import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { SquareAnimationComponent } from "./ui/square-animation/square-animation.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [SquareAnimationComponent, RouterOutlet],
  standalone: true,
})
export class AppComponent {}
