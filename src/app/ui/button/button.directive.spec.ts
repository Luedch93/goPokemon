import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDirective } from './button.directive';

@Component({
  template: '<button appButton></button>',
  standalone: true,
  imports: [ButtonDirective],
})
class TestComponent {}

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('app-button')).toBeTrue();
  });
});
