import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSlotComponent } from './type-slot.component';

describe('TypeSlotComponent', () => {
  let component: TypeSlotComponent;
  let fixture: ComponentFixture<TypeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
