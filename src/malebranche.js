const _ = require('lodash');
const processObject = require('./process-object.js');
const processAttributes = require('../src/process-attributes.js');
const {parseStringIntoJs, serializeJSIntoString} = require('./malebranche-utils.js');

const defaultOptions = {
  // to implement. the idea is the make the clip path just a little bit bigger so as to sit outside of any element
  // we apply to it.
  bleed: 0,
  decimalPlaces: Infinity, // as big as Javascript wants it to be
};

exports.transform = function(src, options) {

  const context = { ...defaultOptions, ...options };

  return Promise.resolve(src)
    .then(parseStringIntoJs)
    .then((result)=> {

      return processObject(result, processAttributes, context);
    })
    .then(serializeJSIntoString)
}




