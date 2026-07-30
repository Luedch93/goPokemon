import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { PokemonPaginationComponent } from './pokemon-pagination.component';

describe('PokemonPaginationComponent', () => {
  let component: PokemonPaginationComponent;
  let fixture: ComponentFixture<PokemonPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPaginationComponent],
      providers: [
        provideMockStore({}),
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
