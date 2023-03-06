import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PokeCardComponent } from "./ui/poke-card/poke-card.component";
import { SquareAnimationComponent } from "./ui/square-animation/square-animation.component";
import { SearchInputComponent } from "./ui/search-input/search-input.component";
import { PaginationComponent } from "./ui/pagination/pagination.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { NotFoundCardComponent } from "./ui/not-found-card/not-found-card.component";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";
import { DetailCardComponent } from "./ui/detail-card/detail-card.component";
import { TypeSlotComponent } from "./ui/type-slot/type-slot.component";
import { WeightHeightPipe } from "./pipes/weight-height.pipe";
import { StatBarComponent } from "./ui/stat-bar/stat-bar.component";
import { StatChartComponent } from "./ui/stat-chart/stat-chart.component";
import { SkeletonSpriteComponent } from "./ui/skeleton-sprite/skeleton-sprite.component";

import { NgrxModule } from "./ngrx.module";
import { ImageOptimizationModule } from "./image-optimization.module";

@NgModule({
  declarations: [
    AppComponent,
    PokeCardComponent,
    SquareAnimationComponent,
    SearchInputComponent,
    PaginationComponent,
    PokemonListComponent,
    NotFoundCardComponent,
    PokemonDetailComponent,
    DetailCardComponent,
    TypeSlotComponent,
    WeightHeightPipe,
    StatBarComponent,
    StatChartComponent,
    SkeletonSpriteComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgrxModule,
    ImageOptimizationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
