const fs = require('fs');

const fuelRequired = weight => Math.floor(weight / 3) - 2;

const fuelForFuel = weight => {
	console.log(weight);

	if (weight < 9) {
		return 0;
	};
	const fuel = fuelRequired(weight);
	return fuel + fuelForFuel(fuel);
};

const file = fs.readFileSync('./input.txt', 'utf8');
const weights = file.split('\n');
const totals = weights.map(fuelForFuel);
const total = totals.reduce((acc, cur) => acc + cur, 0);
// fuelForFuel(total);
console.log(total);