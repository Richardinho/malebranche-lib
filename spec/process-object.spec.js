var processObj = require('../src/process-object.js');

function processAttributes(nodeName, attributes, context) {
  return {attributes, context};
}

const obj = {
  svg: {
    '$': {
      preserveAspectRatio: 'xMinYMin meet',
      width: '100px',
      height: '100px',
      viewBox: '0 0 200 400',
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
              fill: 'blue',
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
              fill: 'blue',
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
                  fill: 'orange',
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

describe('processObj()', () => {
  it('should clone obj', () => {
    const context = {};

    const result = processObj(obj, processAttributes, context);

    expect(result).not.toBe(obj);
    expect(result).toEqual(expected);
  });
});
