const {dp} = require('../src/malebranche-utils.js');

describe('dp()', () => {
  it('should return string representation of number with given number of decimal places', () => {
    expect(dp(0.1234567, 3)).toBe('0.123');
  });
});
