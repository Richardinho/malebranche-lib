const parseViewBox = require('./parse-view-box.js');
const pointsParser = require('./points-parser.js');
const parsePath  = require('svg-path-parser');
const pathBuilder = require('./svg-path-builder.js');
const handleCommand = require('./handle-command.js');
const {dp, offsetX, offsetY} = require('./malebranche-utils.js');

var arrayFromPoints = pointsParser.arrayFromPoints;

function processPath(pathString, context) {
	var pathCommands = parsePath(pathString);
	pathCommands.forEach(handleCommand.bind(null,
    context.width,
    context.height,
    context.minX,
    context.minY,
    context.decimalPlaces));

	return pathBuilder.build(pathCommands);
}

module.exports = function (key, attributes, context) {

  switch(key) {
    case 'svg':
      let minX;
      let minY;
      let width;
      let height;

      if (attributes['viewBox']) {
        ({ minX, minY, width, height } = parseViewBox(attributes['viewBox']));
      } else {
        minX = 0;
        minY = 0;

        if (attributes['width'] && attributes['height']) {
          width = attributes['width'];
          height = attributes['height'];
        } else {
          throw Error('no width and height to calculate coords relative to found');
        }
      }

      context = {...context, minX, minY, width, height };

      break;

    case 'clipPath':

      attributes = {...attributes, clipPathUnits: 'objectBoundingBox'};
      context = {...context, inClipPath: true }

      break;

    case 'path': 

      if (context.inClipPath) {
        attributes = {
          ...attributes,
          d: processPath(attributes.d, context), 
        };
      }

      break;

    case 'ellipse':

      if (context.inClipPath) {
        attributes = {
          ...attributes,
          cx: dp(offsetX(context.minX, attributes.cx) / context.width, context.decimalPlaces),
          cy: dp(offsetY(context.minY, attributes.cy) / context.height, context.decimalPlaces),
          rx: dp(attributes.rx / context.width, context.decimalPlaces),
          ry: dp(attributes.ry / context.height, context.decimalPlaces),
        };
      }

      break;

    // todo: this looks quite tricky
    case 'text':
      if (context.inClipPath) {
      }

      break;


    case 'polygon':

      if (context.inClipPath) {

        var pointsArray = arrayFromPoints(attributes.points);
        var bool = false;

        var transformedPointsArray = pointsArray.map(function (point) {
          return (bool ^= true) ?
            dp(offsetX(context.minX, point) / context.width, context.decimalPlaces): 
            dp(offsetY(context.minY, point) / context.height, context.decimalPlaces);
        });

        const points = transformedPointsArray.join(' ');

        attributes = {
          ...attributes,
          points,
        };
      }

      break;

    case 'circle':
      if (context.inClipPath) {
        attributes = {
          ...attributes,
          r: dp(attributes.r / context.width, context.decimalPlaces),
          cx: dp(offsetX(context.minX, attributes.cx) / context.width, context.decimalPlaces),
          cy: dp(offsetY(context.minY, attributes.cy) / context.height, context.decimalPlaces),
        };
      }

      break;

    case 'rect':

      if (context.inClipPath) {

        attributes = {
          ...attributes,
          x: dp(offsetX(context.minX, attributes.x) / context.width, context.decimalPlaces),
          y: dp(offsetY(context.minY, attributes.y) / context.height, context.decimalPlaces),
          width: dp(attributes.width / context.width, context.decimalPlaces),
          height: dp(attributes.height / context.height, context.decimalPlaces),
        };
      }

      break;

    default:
      break;
  }

  return {attributes, context};
}
