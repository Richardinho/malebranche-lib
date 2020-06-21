var XML_PARSING_ERROR = 'Xml_Parsing_Error';

var xml2js = require('xml2js'),
    util = require('util');

var parser = new xml2js.Parser();

function _isObject(obj) {
	var type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
}

function _isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}

function dp(num, places) {
  if (places >= 0 && places <= 20) { 
    num = num.toFixed(places);
  }

  console.log('dp', num, places);
}

function parseStringIntoJs(xml){ return new
    Promise(function(resolve, reject){
    parser.parseString(xml, function (error, result) {

      //console.log(util.inspect(result, false, null))

      if (error) {
        reject({
          name: XML_PARSING_ERROR, 
          message: 'failed to parse supplied svg',
          error,
        });
      } else {
        resolve(result);
      }
    });
  });
}

/* takes svg object and converts it back into xml string */
function serializeJSIntoString(obj) {
	var builder = new xml2js.Builder();
	return builder.buildObject(obj);
}

function offsetX(offset, x) {
	return x - offset;
}

function offsetY(offset, y) {
	return y - offset;
}

exports.offsetX = offsetX;
exports.offsetY = offsetY;
exports.isObject = _isObject;
exports.isArray = _isArray;
exports.parseStringIntoJs = parseStringIntoJs;
exports.serializeJSIntoString = serializeJSIntoString;
exports.dp = dp;
