import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loadReducer, saveReducer, previousReducer, nextReducer, currentUrlReducer, pokemonReducer } from './reducers/load.reducers';
import { PokeCardComponent } from './ui/poke-card/poke-card.component';
import { SquareAnimationComponent } from './ui/square-animation/square-animation.component';
import { SearchInputComponent } from './ui/search-input/search-input.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { NotFoundCardComponent } from './ui/not-found-card/not-found-card.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { DetailCardComponent } from './ui/detail-card/detail-card.component';
import { TypeSlotComponent } from './ui/type-slot/type-slot.component';
import { WeightHeightPipe } from './pipes/weight-height.pipe';
import { StatBarComponent } from './ui/stat-bar/stat-bar.component';
import { StatChartComponent } from './ui/stat-chart/stat-chart.component';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>('root reducer');

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
    StatChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(REDUCER_TOKEN)
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useValue: {
        pokemons: loadReducer,
        filter: saveReducer,
        previous: previousReducer,
        next: nextReducer,
        apiURL: currentUrlReducer,
        pokemon: pokemonReducer
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
