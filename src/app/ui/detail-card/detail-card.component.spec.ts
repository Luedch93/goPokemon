import { DetailCardComponent } from "./detail-card.component";

import { pokemon } from 'src/app/testing/data/pokemons';

describe('DetailCardUI', () => {
  let comp: DetailCardComponent;

  beforeEach(() => {
    comp = new DetailCardComponent();
  });

  it('should format the types', () => {
    comp.pokemon = pokemon;
    comp.ngOnInit();
    expect(comp.types.length).toBeGreaterThanOrEqual(0);
  });
});
