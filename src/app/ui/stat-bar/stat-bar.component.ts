import { NgStyle } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "stat-bar",
  templateUrl: "./stat-bar.component.html",
  styleUrls: ["./stat-bar.component.scss"],
  imports: [NgStyle],
  standalone: true,
})
export class StatBarComponent implements OnInit {
  @Input() stat!: number;
  maxStat = 267;
  content = "5%";

  ngOnInit() {
    const timer = setInterval(() => {
      this.content = this.calcPercentage(Math.floor(Math.random() * 267));
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      this.content = this.calcPercentage(this.stat);
    }, 3000);
  }

  private calcPercentage(stat: number) {
    return `${Math.floor((stat / this.maxStat) * 100)}%`;
  }
}
