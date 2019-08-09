import { WeightHeightPipe } from './weight-height.pipe';

describe('WeightHeightPipe', () => {
  it('create an instance', () => {
    const pipe = new WeightHeightPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should transform a number to valid weight', () => {
    const pipe = new WeightHeightPipe();
    const result = pipe.transform(300, 'weight');
    expect(result).toEqual('30,0 Kg');
  });

  it('Should transform a number to valid height', () => {
    const pipe = new WeightHeightPipe();
    const result = pipe.transform(1, 'height');
    expect(result).toEqual('0,1 m');
  });
});
