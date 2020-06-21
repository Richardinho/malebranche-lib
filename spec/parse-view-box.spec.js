const parseViewBox = require('../src/parse-view-box.js');

describe('when numbers are separated by spaces', () => {
  it('should parse string into object', () => {
    expect(parseViewBox('2 5 100 100')).toEqual({
      minX: 2,
      minY: 5,
      width: 100,
      height: 100,
    });
  });
});

describe('when numbers are separated by white space', () => {
  it('should parse string into object', () => {
    expect(parseViewBox('0  0   100 100   ')).toEqual({
      minX: 0,
      minY: 0,
      width: 100,
      height: 100,
    });
  });
});
