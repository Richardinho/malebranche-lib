var malebrancheUtils = require('./malebranche-utils.js');
var _isArray = malebrancheUtils.isArray;
var _isObject = malebrancheUtils.isObject;

const MULTIPLE_ROOTS_ERROR = 'MULTIPLE_ROOTS_ERROR';
const NO_ROOT_NODE_ERROR = 'NO_ROOT_NODE_ERROR';
const SVG_NOT_PROVIDED_ERROR = 'SVG_NOT_PROVIDED_ERROR';

module.exports = function (obj, callback, context) {
	if (_isObject(obj)) {
		// get root object
		const keys = Object.keys(obj);

		if (keys.length > 1) {
			throw {
				name: MULTIPLE_ROOTS_ERROR,
				message: 'There is more than one root node in file',
			}
		} else if (keys.length < 1) {
			throw {
				name: NO_ROOT_NODE__ERROR,
				message: 'No root nodes found in file',
			};
		}

		const key = keys[0];
		const rootNode = obj[key];

		return {[key]: processNode(key, context, callback, rootNode)};

	} else {
		throw {
			name: SVG_NOT_PROVIDED_ERROR,
			message: 'SVG object not found in file',
		};
	}
}

function processNode(nodeName, context, callback, node) {

	/*
	 *  This will be undefined if a node has no attributes
	 */

	let attributes;

	/*
	 *  simple nodes, e.g. <div> with no attributes are just strings of their content
	 */

	if (typeof node === 'string') {
		return node;
	}

	const result = {};

	/*
	 *  if node has attributes we store them
	 */

	if (node['$']) {
		attributes = node['$'];
	}

	/*
	 *  process the node and update the context if necessary
	 */

	({attributes, context} = callback(nodeName, attributes, context));

	/*
	 *  write attributes into result if they exist
	 */

	if (attributes) {
		result['$'] = attributes;
	}


	/*
	 *  handle rest of properties
	 */

	for (var key in node) {

		/*
		 *  child nodes are wrapped in arrays
		 */

		if (_isArray(node[key])) {
			const childList = node[key];

			result[key] = childList.map(processNode.bind(null, key, context, callback));
		} 

		/*
		 *  copy text content over
		 */

		if (key === '_') {
			result[key] = node[key];
		}
	}

	return result;
}
