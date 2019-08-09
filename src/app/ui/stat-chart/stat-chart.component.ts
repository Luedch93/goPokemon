import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent implements OnInit {
  @Input() stats: any[];

  constructor() { }

  ngOnInit() {
  }

}
