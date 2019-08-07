import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'type-slot',
  templateUrl: './type-slot.component.html',
  styleUrls: ['./type-slot.component.scss']
})
export class TypeSlotComponent implements OnInit {
  @Input() type: string;
  constructor() { }

  ngOnInit() {
  }

}
