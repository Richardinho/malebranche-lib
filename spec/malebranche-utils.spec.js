const {
	createRel,
	createAbs,
} = require('../src/malebranche-utils.js');

const places = 0.2;

describe('rel()', () => {
	it('should return normalised relative number', () => {
		const rel = createRel(places);
		expect(rel(3, 2)).toBe('4.20');
	});
});

describe('abs()', () => {
	it('should return normalised absolute number', () => {
		const rel = createAbs(places);
		expect(rel(3, 2)).toBe('4.00');
	});
});
