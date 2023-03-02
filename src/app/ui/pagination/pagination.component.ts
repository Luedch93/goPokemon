import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Pagination } from "src/app/types/Pagination";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
  @Input() pagination!: Pagination;
  @Output() clickNext = new EventEmitter<void>();
  @Output() clickPrevious = new EventEmitter<void>();

  constructor() {}

  handleNext() {
    this.clickNext.emit();
  }

  handlePrevious() {
    this.clickPrevious.emit();
  }

  previousPageAvailable(): boolean {
    return this.pagination.page > 1;
  }
}
