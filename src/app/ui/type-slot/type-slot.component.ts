import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "type-slot",
  templateUrl: "./type-slot.component.html",
  styleUrls: ["./type-slot.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class TypeSlotComponent {
  @Input() type!: string;
}
