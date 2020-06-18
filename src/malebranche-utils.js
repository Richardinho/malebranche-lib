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

/*
	todo: what happens when badly formed xml is fed in?
*/

function parseStringIntoJs(xml){ return new
    Promise(function(resolve, reject){
    parser.parseString(xml, function (error, result) {
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



exports.isObject = _isObject;
exports.isArray = _isArray;
exports.parseStringIntoJs = parseStringIntoJs;
exports.serializeJSIntoString = serializeJSIntoString;
