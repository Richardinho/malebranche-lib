const processAttributes = require('../src/process-attributes.js');

describe('processAttributes()', () => {

  describe('polygon', () => {
    let context;
    const nodeName = 'polygon';

    beforeEach(() => {
      context = {
        inClipPath: true,
        minX: 0,
        minY: 0,
        width: 100,
        height: 100,
      };
    });

    describe('when points are space separated', () => {
      it('should calculate points relative to parameters', () => {
        let attributes = {
          points: '0 10 1 11 2 12',
        };

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes.points).toBe('0 0.1 0.01 0.11 0.02 0.12');
      });
    });

    describe('when points string has abnormal white space', () => {
      it('should calculate points relative to parameters', () => {
        let attributes = {
          points: '0  10   1   11  2  12',
        };

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes.points).toBe('0 0.1 0.01 0.11 0.02 0.12');
      });
    });

    describe('when points string has abnormal white space and commas', () => {
      it('should calculate points relative to parameters', () => {
        let attributes = {
          points: '0  10 ,  1   11 , 2,  12',
        };

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes.points).toBe('0 0.1 0.01 0.11 0.02 0.12');
      });
    });
  });
});
