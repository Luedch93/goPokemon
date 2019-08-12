import { StatBarComponent } from "./stat-bar.component";
import { tick, fakeAsync } from '@angular/core/testing';

describe('StatBarComponent', () => {
  let comp: StatBarComponent;

  beforeEach(() => {
    comp = new StatBarComponent();
  });

  it('should calculate the percentage', fakeAsync(() => {
    comp.stat = 267;
    comp.ngOnInit();
    tick(4000);
    expect(comp.content).toBe('100%');
  }));
});
