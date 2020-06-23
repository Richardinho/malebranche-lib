const parseViewBox = require('./parse-view-box.js');
const pointsParser = require('./points-parser.js');
const parsePath  = require('svg-path-parser');
const pathBuilder = require('./svg-path-builder.js');
const handleCommand = require('./handle-command.js');
const {dp, offsetX, offsetY} = require('./malebranche-utils.js');

const NO_WIDTH_OR_HEIGHT_ERROR = 'NO_WIDTH_OR_HEIGHT_ERROR';

const X_ATTRIBUTE = 'x';
const Y_ATTRIBUTE = 'y';
const DX_ATTRIBUTE = 'dx';
const DY_ATTRIBUTE = 'dy';
const TEXT_LENGTH_ATTRIBUTE = 'textLength';
const FONT_SIZE_ATTRIBUTE = 'font-size';
const POINTS_ATTRIBUTE = 'points';
const CX_ATTRIBUTE = 'cx';
const CY_ATTRIBUTE = 'cy';
const R_ATTRIBUTE = 'r';
const RX_ATTRIBUTE = 'rx';
const RY_ATTRIBUTE = 'ry';
const D_ATTRIBUTE = 'd';
const WIDTH_ATTRIBUTE = 'width';
const HEIGHT_ATTRIBUTE = 'height';

const SVG_ELEMENT = 'svg';
const CLIP_PATH_ELEMENT = 'clipPath';
const PATH_ELEMENT = 'path';
const ELLIPSE_ELEMENT = 'ellipse';
const TEXT_ELEMENT = 'text';
const TSPAN_ELEMENT = 'tspan';
const TEXT_LENGTH_ELEMENT = 'textLength';
const CIRCLE_ELEMENT = 'circle';
const RECT_ELEMENT = 'rect';

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
    case SVG_ELEMENT:
      let minX;
      let minY;
      let width;
      let height;

      if (attributes) {

        if (attributes['viewBox']) {

          ({ minX, minY, width, height } = parseViewBox(attributes['viewBox']));

        } else if (attributes['width'] && attributes['height']) {

          minX = 0;
          minY = 0;
          width = attributes['width'];
          height = attributes['height'];

        } else {
          throw {
            name: NO_WIDTH_OR_HEIGHT_ERROR,
            message: 'you need to add width and height values to root element'
          };
        }
      } else {
        throw {
          name: NO_WIDTH_OR_HEIGHT_ERROR,
          message: 'you need to add width and height values to root element'
        };
      }

      context = {...context, minX, minY, width, height };

      break;

    case CLIP_PATH_ELEMENT:

      attributes = {...attributes, clipPathUnits: 'objectBoundingBox'};

      break;

    case PATH_ELEMENT: 

      attributes = [D_ATTRIBUTE].reduce((attributes, attr) => {
        if (attributes && attributes[attr]) {
          return {
            ...attributes,
            [attr]: processPath(attributes[attr], context), 
          };
        }

        return attributes;

      }, attributes);

      break;

    case ELLIPSE_ELEMENT:
      attributes = [
        CX_ATTRIBUTE,
        CY_ATTRIBUTE,
        RX_ATTRIBUTE,
        RY_ATTRIBUTE,
      ].reduce((attributes, attr) => {
        if (attributes && attributes[attr]) {
          const val = attributes[attr];

          switch(attr) {
            case CX_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(offsetX(context.minX, attributes[attr]) / context.width, context.decimalPlaces),
              };
            case CY_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(offsetY(context.minY, attributes[attr]) / context.height, context.decimalPlaces),
              };
            case RX_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(attributes[attr] / context.width, context.decimalPlaces),
              };
            case RY_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(attributes[attr] / context.height, context.decimalPlaces),
              };
            default:
              return attributes;
          }
        }

        return attributes;

      }, attributes);

      break;

    case 'tref':
      //  deprecated in SVG spec
      break;

    case TSPAN_ELEMENT:
    case TEXT_ELEMENT:
      attributes = [
        FONT_SIZE_ATTRIBUTE,
        X_ATTRIBUTE,
        Y_ATTRIBUTE,
        DX_ATTRIBUTE,
        DY_ATTRIBUTE,
        TEXT_LENGTH_ATTRIBUTE,
      ].reduce((attributes, attr) => {
        if (attributes && attributes[attr]) {
          const val = attributes[attr];

          switch(attr) {

            case FONT_SIZE_ATTRIBUTE:
              return {
                ...attributes,
                [attr] : dp(attributes[attr] / context.height, context.decimalPlaces)
              };

            case X_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(offsetX(context.minX, attributes[attr]) / context.width, context.decimalPlaces),
              };

            case Y_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(offsetY(context.minY, attributes[attr]) / context.height, context.decimalPlaces),
              };

            case DX_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(attributes[attr] / context.width, context.decimalPlaces),
              };

            case DY_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(attributes[attr] / context.height, context.decimalPlaces),
              };

            case TEXT_LENGTH_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(attributes[attr] / context.width, context.decimalPlaces),
              };

            default: 
              return attributes;
          }
        }

        return attributes;

      }, attributes);

      break;

    case 'polygon':
      attributes = [
        POINTS_ATTRIBUTE,
      ].reduce((attributes, attr) => {
        if (attributes && attributes[attr]) {
          const val = attributes[attr];

          switch(attr) {

            case POINTS_ATTRIBUTE:

              var pointsArray = arrayFromPoints(val);
              var bool = false;

              var transformedPointsArray = pointsArray.map(function (point) {
                return (bool ^= true) ?
                  dp(offsetX(context.minX, point) / context.width, context.decimalPlaces): 
                  dp(offsetY(context.minY, point) / context.height, context.decimalPlaces);
              });

              const points = transformedPointsArray.join(' ');

              return {
                ...attributes,
                points,
              };

              break;

            default:
              return attributes;
          }
        }

        return attributes;
      }, attributes);

      break;

    case CIRCLE_ELEMENT:
      attributes = [
        CX_ATTRIBUTE,
        CY_ATTRIBUTE,
        R_ATTRIBUTE,
      ].reduce((attributes, attr) => {
        if (attributes && attributes[attr]) {

          switch(attr) {
            case CX_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(offsetX(context.minX, attributes[attr]) / context.width, context.decimalPlaces),
              };

            case CY_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(offsetY(context.minY, attributes[attr]) / context.height, context.decimalPlaces),
              };

            case R_ATTRIBUTE:
              return {
                ...attributes,
                [attr]: dp(attributes[attr] / context.width, context.decimalPlaces),
              };

            default:
              return attributes;
          }
        }

        return attributes;
      }, attributes);


    case RECT_ELEMENT:
      attributes = [
        X_ATTRIBUTE,
        Y_ATTRIBUTE,
        WIDTH_ATTRIBUTE,
        HEIGHT_ATTRIBUTE,
      ].reduce((attributes, attr) => {

        if (attributes && attributes[attr]) {

          switch(attr) {
            case X_ATTRIBUTE:
              return {
                ...attributes,
                x: dp(offsetX(context.minX, attributes[attr]) / context.width, context.decimalPlaces),
              };

            case Y_ATTRIBUTE:
              return {
                ...attributes,
                y: dp(offsetY(context.minY, attributes[attr]) / context.height, context.decimalPlaces),
              };

            case WIDTH_ATTRIBUTE:
              return {
                ...attributes,
                width: dp(attributes[attr] / context.width, context.decimalPlaces),
              };

            case HEIGHT_ATTRIBUTE:
              return {
                ...attributes,
                height: dp(attributes[attr] / context.height, context.decimalPlaces),
              };

            default:
              return attributes;
          }
        }
        return attributes;
      }, attributes);

      break;

    default:
      break;
  }

  return {attributes, context};
}
