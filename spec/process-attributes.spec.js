const processAttributes = require('../src/process-attributes.js');

const WIDTH = 100;
const HEIGHT = 50;


describe('processAttributes()', () => {

  describe('svg', () => {
    const nodeName = 'svg';

    describe('when element has no attributes', () => {
      it('should throw error', () => {
        let attributes;  // undefined
        let context = {};

        const func = processAttributes.bind(null, nodeName, attributes, context);

        expect(func).toThrow({
          name: 'NO_WIDTH_OR_HEIGHT_ERROR',
          message: 'you need to add width and height values to root element',
        });
      });
    });

    describe('when element has attributes but not width, height, nor viewBox', () => {
      it('should throw error', () => {
        let attributes = {
          foo: 'foo',
        };

        let context = {};

        const func = processAttributes.bind(null, nodeName, attributes, context);

        expect(func).toThrow({
          name: 'NO_WIDTH_OR_HEIGHT_ERROR',
          message: 'you need to add width and height values to root element',
        });
      });
    });

    describe('when element has a viewBox attribute', () => {
      it('should return context with minX, minY, width, and height properties', () => {
        let attributes = {
          viewBox: '1 2 3 4',
        };

        let context = {};

        ({context} = processAttributes(nodeName, attributes, context));

        expect(context).toEqual({
          minX: 1,
          minY: 2,
          width: 3,
          height: 4,
        });
      });
    });

    describe('when element has width and height attributes', () => {
      it('should return context with width, and height properties and default values for minX and minY', () => {
        let attributes = {
          width: 100,
          height: 23,
        };

        let context = {};

        ({context} = processAttributes(nodeName, attributes, context));

        expect(context).toEqual({
          minX: 0,
          minY: 0,
          width: 100,
          height: 23,
        });
      });
    });

    describe('when element has viewBox, width and height attributes', () => {
      it('should give priority to viewBox', () => {
        let attributes = {
          width: 100,
          height: 23,
          viewBox: '1 2 3 4', 
        };

        let context = {};

        ({context} = processAttributes(nodeName, attributes, context));

        expect(context).toEqual({
          minX: 1,
          minY: 2,
          width: 3,
          height: 4,
        });
      });
    });
  });

  describe('clipPath', () => {
    const nodeName = 'clipPath';

    describe('when element does NOT have any attributes', () => {
      it('should return attributes object with clipPathUnits set', () => {
        let attributes; // undefined
        let context = {};

        ({context, attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toEqual({
          clipPathUnits: 'objectBoundingBox',
        });
      });
    });
  });

  describe('path', () => {
    const nodeName = 'path';

    describe('when element does NOT have any attributes', () => {
      it('should return undefined attributes object', () => {
        let attributes; // undefined
        let context = {};

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toBeUndefined();
      });
    });

    describe('when element has non-relevant attributes', () => {
      let result;
      let attributes;
			let context = {};

      beforeEach(() => {
        attributes = {
          foo: 'foo', 
        };
        
        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should pass these through', () => {
        expect(result).toEqual({
          foo: 'foo'
        });
      });

      it('should return same attributes object', () => {
        expect(result).toBe(attributes);
      });
    });

    describe('when element has attributes to process', () => {
      let attributes;
			let context;
      let result;

      beforeEach(() => {
        context = {
          minX: 0,
          minY: 0,
          width: WIDTH,
          height: HEIGHT,
					bleed: 0,
        };

        attributes = {
          'd': 'M100 50',
        };

        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should return values as fractions', () => {
        expect(result).toEqual({
          d: 'M1 1'
         });
      });

      it('should return different attributes object', () => {
        expect(result).not.toBe(attributes);
      });
    });
  });

  describe('ellipse', () => {
    const nodeName = 'ellipse';

    let context;

    beforeEach(() => {
      context = {
        minX: 0,
        minY: 0,
        width: WIDTH,
        height: HEIGHT,
				bleed: 0,
      };
    });

    describe('when element does NOT have any attributes', () => {
      it('should return undefined attributes object', () => {
        let attributes; // undefined

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toEqual(undefined);
      });
    });

    describe('when element has non-relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          foo: 'foo', 
        };
        
        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should pass these through', () => {
        expect(result).toEqual({
          foo: 'foo'
        });
      });

      it('should return same attributes object', () => {
        expect(result).toBe(attributes);
      });
    });

    describe('when element has relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          cx: 24,
          cy: 34,
          rx: 21,
          ry: 45,
        };

        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should return values as fractions', () => {
        expect(result).toEqual({
          cx: 24 / 100,
          cy: 34 / 50,
          rx: 21 / 100, 
          ry:  45 / 50,
         });
      });

      it('should return different attributes object', () => {
        expect(result).not.toBe(attributes);
      });
    });
  });

  describe('text', () => {
    const nodeName = 'text';

    let context;

    beforeEach(() => {
      context = {
        minX: 0,
        minY: 0,
        width: WIDTH,
        height: HEIGHT,
				bleed: 0,
      };
    });

    describe('when element does NOT have any attributes', () => {

      it('should return undefined attributes object', () => {
        let attributes; // undefined

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toBeUndefined();
      });
    });

    describe('when element has non-relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          foo: 'foo', 
        };
        
        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should pass these through', () => {
        expect(result).toEqual({
          foo: 'foo'
        });
      });

      it('should return same attributes object', () => {
        expect(result).toBe(attributes);
      });
    });

    describe('when element has relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {

        attributes = {
          'font-size': 20,
          x: 24,
          y: 34,
          dx: 21,
          dy: 45,
          textLength: 36,
        };

        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should return values as fractions', () => {
        expect(result).toEqual({
          'font-size': 20 / 50, 
          x: 24 / 100,
          y: 34 / 50,
          dx: 21 / 100, 
          dy:  45 / 50,
          textLength: 36/ 100,
         });
      });

      it('should return different attributes object', () => {
        expect(result).not.toBe(attributes);
      });
    });
  });

  describe('polygon', () => {
    const nodeName = 'polygon';

    let context;

    beforeEach(() => {
      context = {
        minX: 0,
        minY: 0,
        width: WIDTH,
        height: 100,
				bleed: 0,
      };
    });

    describe('when element does NOT have any attributes', () => {
      it('should return undefined attributes object', () => {
        let attributes; // undefined

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toBeUndefined();
      });
    });

    describe('when element has non-relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          foo: 'foo', 
        };
        
        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should pass these through', () => {
        expect(result).toEqual({
          foo: 'foo',
        });
      });

      it('should return same object for attributes as passed in', () => {
        expect(result).toBe(attributes);
      });
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


  describe('circle', () => {
    const nodeName = 'circle';

    let context;

    beforeEach(() => {
      context = {
        minX: 0,
        minY: 0,
        width: WIDTH,
        height: HEIGHT,
				bleed: 0,
      };
    });

    describe('when element does NOT have any attributes', () => {
      it('should return undefined attributes object', () => {
        let attributes;

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toBeUndefined();
      });
    });

    describe('when element has non-relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          foo: 'foo', 
        };
        
        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should pass these through', () => {
        expect(result).toEqual({
          foo: 'foo'
        });
      });

      it('should return same attributes object', () => {
        expect(result).toBe(attributes);
      });
    });

    describe('when element has attributes to process', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          cx: 24,
          cy: 34,
          r: 21,
        };

        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should return values as fractions', () => {
        expect(result).toEqual({
          cx: 24 / 100,
          cy: 34 / 50,
          r: 21 / 100, 
         });
      });

      it('should return different attributes object', () => {
        expect(result).not.toBe(attributes);
      });
    });
  });

  describe('rect', () => {
    const nodeName = 'rect';

    let attributes;

    beforeEach(() => {

      context = {
        minX: 0,
        minY: 0,
        width: WIDTH,
        height: HEIGHT,
				bleed: 0,
      };
    });

    describe('when element does NOT have any attributes', () => {
      it('should return undefined attributes object', () => {
        let attributes;

        ({attributes} = processAttributes(nodeName, attributes, context));

        expect(attributes).toBeUndefined();
      });
    });

    describe('when element has non-relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          foo: 'foo', 
        };
        
        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should pass these through', () => {
        expect(result).toEqual({
          foo: 'foo'
        });
      });

      it('should return same attributes object', () => {
        expect(result).toBe(attributes);
      });
    });

    describe('when element has relevant attributes', () => {
      let attributes;
      let result;

      beforeEach(() => {
        attributes = {
          'x': 24,
          'y': 34,
          'width': 21,
          'height': 34,
        };

        ({attributes: result} = processAttributes(nodeName, attributes, context));
      });

      it('should return values as fractions', () => {
        expect(result).toEqual({
          x: 24 / 100,
          y: 34 / 50,
          width: 21 / 100, 
          height: 34/ 50,
         });
      });

      it('should return different attributes object', () => {
        expect(result).not.toBe(attributes);
      });
    });
  });
});
