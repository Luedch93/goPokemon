import { Component } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "not-found-card",
  templateUrl: "./not-found-card.component.html",
  styleUrls: ["./not-found-card.component.scss"],
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
})
export class NotFoundCardComponent {
  constructor() {}
}
