import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { WeightHeightPipe } from "../pipes/weight-height.pipe";
import { DetailCardComponent } from "./detail-card/detail-card.component";
import { NotFoundCardComponent } from "./not-found-card/not-found-card.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { PokeCardComponent } from "./poke-card/poke-card.component";
import { SearchInputComponent } from "./search-input/search-input.component";
import { SkeletonSpriteComponent } from "./skeleton-sprite/skeleton-sprite.component";
import { SquareAnimationComponent } from "./square-animation/square-animation.component";
import { StatBarComponent } from "./stat-bar/stat-bar.component";
import { StatChartComponent } from "./stat-chart/stat-chart.component";
import { TypeSlotComponent } from "./type-slot/type-slot.component";

import { ImageOptimizationModule } from "../image-optimization.module";

const components = [
  DetailCardComponent,
  NotFoundCardComponent,
  PaginationComponent,
  PokeCardComponent,
  SearchInputComponent,
  SkeletonSpriteComponent,
  SquareAnimationComponent,
  StatBarComponent,
  StatChartComponent,
  TypeSlotComponent,
  WeightHeightPipe,
];

@NgModule({
  imports: [CommonModule, ImageOptimizationModule, ReactiveFormsModule],
  declarations: [...components],
  exports: [...components],
})
export class UiModule {}
