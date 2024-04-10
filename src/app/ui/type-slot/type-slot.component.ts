import { NgSwitch, NgSwitchCase } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "type-slot",
  templateUrl: "./type-slot.component.html",
  styleUrls: ["./type-slot.component.scss"],
  imports: [NgSwitch, NgSwitchCase],
  standalone: true,
})
export class TypeSlotComponent {
  @Input() type!: string;
}
