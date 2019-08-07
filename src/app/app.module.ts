import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loadReducer, saveReducer, previousReducer, nextReducer, currentUrlReducer } from './reducers/load.reducers';
import { PokeCardComponent } from './ui/poke-card/poke-card.component';
import { SquareAnimationComponent } from './ui/square-animation/square-animation.component';
import { SearchInputComponent } from './ui/search-input/search-input.component';
import { PaginationComponent } from './ui/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    PokeCardComponent,
    SquareAnimationComponent,
    SearchInputComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      pokemons: loadReducer,
      filter: saveReducer,
      previous: previousReducer,
      next: nextReducer,
      apiURL: currentUrlReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
