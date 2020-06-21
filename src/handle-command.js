const {dp, offsetX, offsetY} = require('./malebranche-utils.js');

module.exports = function handleCommand (hRefLength, vRefLength, x, y, places, command) {
	switch(command.code){
	case 'M':
		command.x = dp(offsetX(x, command.x) / hRefLength, places);
		command.y = dp(offsetY(y, command.y) / vRefLength, places);
		break;
	case 'm':
		command.x = dp(command.x / hRefLength, places);
		command.y = dp(command.y / vRefLength, places);
		break;
	case 'L':
		command.x = dp(offsetX(x, command.x) / hRefLength, places);
		command.y = dp(offsetY(y, command.y) / vRefLength, places);
		break;
	case 'l':
		command.x = dp(command.x / hRefLength, places);
		command.y = dp(command.y / vRefLength, places);
		break;
	case 'V':
		command.y = dp(offsetY(y, command.y) / vRefLength, places);
		break;
	case 'v':
		command.y = dp(command.y / vRefLength, places);
		break;
	case 'H':
		command.x = dp(offsetX(x, command.x) / hRefLength, places);
		break;
	case 'h':
		command.x = dp(command.x / hRefLength, places);
		break;
	case 'C':
		command.x =  dp(offsetX(x, command.x) / hRefLength, places);
		command.y =  dp(offsetY(y, command.y) / vRefLength, places);
		command.x1 = dp(offsetX(x, command.x1) / hRefLength, places);
 		command.y1 = dp(offsetY(y, command.y1) / vRefLength, places);
		command.x2 = dp(offsetX(x, command.x2) / hRefLength, places);
 		command.y2 = dp(offsetY(y, command.y2) / vRefLength, places);
		break;
	case 'c':
		command.x =  dp(command.x  / hRefLength, places);
		command.y =  dp(command.y  / vRefLength, places);
		command.x1 = dp(command.x1  / hRefLength, places);
 		command.y1 = dp(command.y1  / vRefLength, places);
		command.x2 = dp(command.x2  / hRefLength, places);
 		command.y2 = dp(command.y2  / vRefLength, places);
		break;
	case 'S':
		command.x =  dp(offsetX(x, command.x ) / hRefLength, places);
		command.y =  dp(offsetY(y, command.y ) / vRefLength, places);
		command.x2 = dp(offsetX(x, command.x2)  / hRefLength, places);
 		command.y2 = dp(offsetY(y, command.y2)  / vRefLength, places);
		break;
	case 's':
		command.x =  dp(command.x  / hRefLength, places);
		command.y =  dp(command.y  / vRefLength, places);
		command.x2 = dp(command.x2  / hRefLength, places);
 		command.y2 = dp(command.y2  / vRefLength, places);
		break;
	case 'Q':
		command.x =  dp(offsetX(x, command.x  ) / hRefLength, places);
		command.y =  dp(offsetY(y, command.y  ) / vRefLength, places);
		command.x1 = dp(offsetX(x, command.x1 )  / hRefLength, places);
		command.y1 = dp(offsetY(y, command.y1 )  / vRefLength, places);
		break;
	case 'q':
		command.x =  dp(command.x   / hRefLength, places);
		command.y =  dp(command.y   / vRefLength, places);
		command.x1 = dp(command.x1   / hRefLength, places);
		command.y1 = dp(command.y1   / vRefLength, places);
		break;
	case 'T':
		command.x = dp(offsetX(x, command.x ) / hRefLength, places);
		command.y = dp(offsetY(y, command.y ) / vRefLength, places);
		break;
	case 't':
		command.x = dp(command.x / hRefLength, places);
		command.y = dp(command.y / vRefLength, places);
		break;
	case 'A':
		command.x =  dp(offsetX(x, command.x  ) / hRefLength, places);
		command.y =  dp(offsetY(y, command.y  ) / vRefLength, places);
		command.rx = dp(command.rx / hRefLength, places);
		command.ry = dp(command.ry / vRefLength, places);
		break;
	case 'a':
		command.x =  dp(command.x  / hRefLength, places);
		command.y =  dp(command.y  / vRefLength, places);
		command.rx = dp(command.rx / hRefLength, places);
		command.ry = dp(command.ry / vRefLength, places);
		break;
	default :
		// do something else
	}
}
