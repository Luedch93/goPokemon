import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square-animation',
  templateUrl: './square-animation.component.html',
  styleUrls: ['./square-animation.component.scss']
})
export class SquareAnimationComponent implements OnInit {

  @Input() width: string;
  @Input() heigth: string;
  @Input() color: string;
  @Input() position: string;
  @Input() delay: string;

  constructor() {
   }

  ngOnInit() {
  }

}
