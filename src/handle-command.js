const {
	createAbs,
	createRel,
	offsetX,
	offsetY,
} = require('./malebranche-utils.js');

module.exports = function handleCommand (
	hRefLength,
	vRefLength,
	x,
	y,
	places,
	bleed,
	command) {

	const abs = createAbs(bleed);
	const rel = createRel(bleed);

	switch(command.code){
	case 'M':
		command.x = abs(offsetX(x, command.x) / hRefLength, places);
		command.y = abs(offsetY(y, command.y) / vRefLength, places);
		break;

	case 'm':
		command.x = rel(command.x / hRefLength, places);
		command.y = rel(command.y / vRefLength, places);
		break;

	case 'L':
		command.x = abs(offsetX(x, command.x) / hRefLength, places);
		command.y = abs(offsetY(y, command.y) / vRefLength, places);
		break;

	case 'l':
		command.x = rel(command.x / hRefLength, places);
		command.y = rel(command.y / vRefLength, places);
		break;

	case 'V':
		command.y = abs(offsetY(y, command.y) / vRefLength, places);
		break;

	case 'v':
		command.y = rel(command.y / vRefLength, places);
		break;

	case 'H':
		command.x = abs(offsetX(x, command.x) / hRefLength, places);
		break;

	case 'h':
		command.x = rel(command.x / hRefLength, places);
		break;

	case 'C':
		command.x =  abs(offsetX(x, command.x) / hRefLength, places);
		command.y =  abs(offsetY(y, command.y) / vRefLength, places);
		command.x1 = abs(offsetX(x, command.x1) / hRefLength, places);
 		command.y1 = abs(offsetY(y, command.y1) / vRefLength, places);
		command.x2 = abs(offsetX(x, command.x2) / hRefLength, places);
 		command.y2 = abs(offsetY(y, command.y2) / vRefLength, places);
		break;

	case 'c':
		command.x =  rel(command.x  / hRefLength, places);
		command.y =  rel(command.y  / vRefLength, places);
		command.x1 = rel(command.x1  / hRefLength, places);
 		command.y1 = rel(command.y1  / vRefLength, places);
		command.x2 = rel(command.x2  / hRefLength, places);
 		command.y2 = rel(command.y2  / vRefLength, places);
		break;

	case 'S':
		command.x =  abs(offsetX(x, command.x ) / hRefLength, places);
		command.y =  abs(offsetY(y, command.y ) / vRefLength, places);
		command.x2 = abs(offsetX(x, command.x2)  / hRefLength, places);
 		command.y2 = abs(offsetY(y, command.y2)  / vRefLength, places);
		break;

	case 's':
		command.x =  rel(command.x  / hRefLength, places);
		command.y =  rel(command.y  / vRefLength, places);
		command.x2 = rel(command.x2  / hRefLength, places);
 		command.y2 = rel(command.y2  / vRefLength, places);
		break;

	case 'Q':
		command.x =  abs(offsetX(x, command.x  ) / hRefLength, places);
		command.y =  abs(offsetY(y, command.y  ) / vRefLength, places);
		command.x1 = abs(offsetX(x, command.x1 )  / hRefLength, places);
		command.y1 = abs(offsetY(y, command.y1 )  / vRefLength, places);
		break;

	case 'q':
		command.x =  rel(command.x   / hRefLength, places);
		command.y =  rel(command.y   / vRefLength, places);
		command.x1 = rel(command.x1   / hRefLength, places);
		command.y1 = rel(command.y1   / vRefLength, places);
		break;

	case 'T':
		command.x = abs(offsetX(x, command.x ) / hRefLength, places);
		command.y = abs(offsetY(y, command.y ) / vRefLength, places);
		break;

	case 't':
		command.x = rel(command.x / hRefLength, places);
		command.y = rel(command.y / vRefLength, places);
		break;

	case 'A':
		command.x =  abs(offsetX(x, command.x  ) / hRefLength, places);
		command.y =  abs(offsetY(y, command.y  ) / vRefLength, places);
		command.rx = abs(command.rx / hRefLength, places);
		command.ry = abs(command.ry / vRefLength, places);
		break;

	case 'a':
		command.x =  rel(command.x  / hRefLength, places);
		command.y =  rel(command.y  / vRefLength, places);
		command.rx = rel(command.rx / hRefLength, places);
		command.ry = rel(command.ry / vRefLength, places);
		break;

	default :
		// do something else
	}
}
