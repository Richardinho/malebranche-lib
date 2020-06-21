const _ = require('lodash');
const parseObj = require('./parse-obj.js');
const processAttributes = require('../src/process-attributes.js');
const {parseStringIntoJs, serializeJSIntoString} = require('./malebranche-utils.js');

const defaultOptions = {
  bleed: 0,
  decimalPlaces: Infinity, // as big as Javascript wants it to be
};

exports.transform = function(src, options) {

  const context = { ...defaultOptions, ...options };

  return Promise.resolve(src)
    .then(parseStringIntoJs)
    .then((result)=> {
      return parseObj(result, processAttributes, context);
    })
    .then(serializeJSIntoString)
}




