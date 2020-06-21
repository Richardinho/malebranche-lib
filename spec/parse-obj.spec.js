var parseObj = require('../src/parse-obj.js');
var processAttributes = require('../src/process-attributes.js');

const obj = {
  svg: {
    '$': {
      preserveAspectRatio: 'xMinYMin meet',
      width: '100px',
      height: '100px',
      viewBox: '0 0 200 400'
    },
    clipPath: [
      {
        rect: [
          {
            '$': {
              x: '5',
              y: '5',
              width: '190',
              height: '390',
              fill: 'blue'
            }
          }
        ]
      }
    ],
    svg: [
      {
        '$': { viewBox: '0 0 500 500' },
        clipPath: [
          {
           '$': { clipPathUnits: 'useSpaceOnUse' },
            rect: [
              {
                '$': {
                  x: '0',
                  y: '0',
                  width: '100',
                  height: '100',
                  fill: 'orange'
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
const expected = {
  svg: {
    '$': {
      preserveAspectRatio: 'xMinYMin meet',
      width: '100px',
      height: '100px',
      viewBox: '0 0 200 400'
    },
    clipPath: [
      {
        rect: [
          {
            '$': {
              x: '5',
              y: '5',
              width: '190',
              height: '390',
              fill: 'lightgoldenrodyellow'
            }
          }
        ]
      }
    ],
    svg: [
      {
        '$': { viewBox: '0 0 500 500' },
        clipPath: [
          {
            '$': { clipPathUnits: 'objectBoundingBox' },
            rect: [
              {
                '$': {
                  x: '0',
                  y: '0',
                  width: '100',
                  height: '100',
                  fill: 'lightgoldenrodyellow'
                }
              }
            ]
          }
        ]
      }
    ]
  }
}


describe('parseObj()', () => {
  it('should..', () => {
    const context = {};
    console.log(parseObj(obj, processAttributes, context));
    expect(parseObj(obj, processAttributes, context)).toEqual(expected);
  });
});
