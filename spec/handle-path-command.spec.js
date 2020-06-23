describe('read-file tests', function () {
  var handleCommand = require('../src/handle-command');

	describe('handleCommand()', function () {

		var hRefLength,
		    vRefLength,
		    x, y, xmin = -23, ymin = 78,
        places = Infinity,
		    command;

		describe('M', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'M',
					x : x,
					y : y
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});

		describe('m', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'm',
					x,
					y,
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
			});
		});

		describe('L', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'L',
					x,
					y,
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});

		describe('l', function () {

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				command = {
					code : 'l',
					x,
					y,
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
			});
		});

		describe('V', function () {

			beforeEach(function () {
				vRefLength = 23;
				y = 12;
				command = {
					code : 'V',
					y,
				};

				handleCommand(null, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});

		describe('v', function () {

			beforeEach(function () {
				vRefLength = 23;
				y = 12;
				command = {
					code : 'v',
					y,
				};

				handleCommand(null, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.y).toBe(y / vRefLength);
			});
		});

		describe('H', function () {

			beforeEach(function () {
				hRefLength = 43;
				x = 23;
				command = {
					code : 'H',
					x,
				};

				handleCommand(hRefLength, null, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
			});
		});

		describe('h', function () {

			beforeEach(function () {
				hRefLength = 43;
				x = 23;
				command = {
					code : 'h',
					x,
				};

				handleCommand(hRefLength, null, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
			});
		});

		describe('C', function () {
			var x,
				y,
				x1,
				y1,
				x2,
				y2;

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				x1 = 45;
				y1 = 67;
				x2 = 87;
				y2 = 56;

				command = {
					code : 'C',
					x,
					y,
					x1,
					y1,
					x2,
					y2
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.x1).toBe((x1 - xmin) / hRefLength);
				expect(command.y1).toBe((y1 - ymin) / vRefLength);
				expect(command.x2).toBe((x2 - xmin) / hRefLength);
				expect(command.y2).toBe((y2 - ymin) / vRefLength);
			});
		});

		describe('c', function () {
			var x,
				y,
				x1,
				y1,
				x2,
				y2;

			beforeEach(function () {
				hRefLength = 43;
				vRefLength = 23;
				x = 23;
				y = 12;
				x1 = 45;
				y1 = 67;
				x2 = 87;
				y2 = 56;

				command = {
					code : 'c',
					x,
					y,
					x1,
					y1,
					x2,
					y2
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.x1).toBe(x1 / hRefLength);
				expect(command.y1).toBe(y1 / vRefLength);
				expect(command.x2).toBe(x2 / hRefLength);
				expect(command.y2).toBe(y2 / vRefLength);
			});
		});

		describe('S', function () {
			var x,
				y,
				x2,
				y2;

			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x2 = 87;
				y2 = 56;
				command = {
					code : 'S',
					x,
					y,
					x2,
					y2
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.x2).toBe((x2 - xmin) / hRefLength);
				expect(command.y2).toBe((y2 - ymin) / vRefLength);
			});
		});

		describe('s', function () {
			var x,
				y,
				x2,
				y2;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x2 = 87;
				y2 = 56;
				command = {
					code : 's',
					x,
					y,
					x2,
					y2
				};
				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.x2).toBe(x2 / hRefLength);
				expect(command.y2).toBe(y2 / vRefLength);
			});
		});

		describe('Q', function () {
			var x,
				y,
				x1,
				y1;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x1 = 87;
				y1 = 56;
				command = {
					code : 'Q',
					x,
					y,
					x1,
					y1
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.x1).toBe((x1 - xmin) / hRefLength);
				expect(command.y1).toBe((y1 - ymin) / vRefLength);
			});
		});

		describe('q', function () {
			var x,
				y,
				x1,
				y1;
			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				x1 = 87;
				y1 = 56;
				command = {
					code : 'q',
					x,
					y,
					x1,
					y1,
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.x1).toBe(x1 / hRefLength);
				expect(command.y1).toBe(y1 / vRefLength);
			});
		});

		describe('T', function () {
			var x,
		  		y;

			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				command = {
					code : 'T',
					x,
					y,
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
			});
		});

		describe('t', function () {
			var x,
		  		y;

			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				command = {
					code : 't',
					x,
					y
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.y).toBe(y / vRefLength);
			});
		});

		describe('A', function () {
			var x,
				y,
				rx,
				ry;

			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				rx = 34;
				ry = 32;

				command = {
					code : 'A',
					x,
					y,
					rx,
					ry,
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe((x - xmin) / hRefLength);
				expect(command.y).toBe((y - ymin) / vRefLength);
				expect(command.rx).toBe(rx / hRefLength);
				expect(command.ry).toBe(ry / vRefLength);
			});
		});

		describe('a', function () {
			var x,
				y,
				rx,
				ry;

			beforeEach(function () {

				hRefLength = 93;
				vRefLength = 73;
				x = 23;
				y = 12;
				rx = 34;
				ry = 32;

				command = {
					code : 'a',
					x,
					y,
					rx,
					ry
				};

				handleCommand(hRefLength, vRefLength, xmin, ymin, places, command);
			});

			it('should convert absolute coords to relative coords', function () {
				expect(command.x).toBe(x / hRefLength);
				expect(command.rx).toBe(rx / hRefLength);
				expect(command.y).toBe(y / vRefLength);
				expect(command.ry).toBe(ry / vRefLength);
			});
		});
	});
});
