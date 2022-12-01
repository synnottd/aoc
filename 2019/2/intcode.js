const fs = require('fs');
const OPCODE = 0;
const INPUT1 = 1;
const INPUT2 = 2;
const OUTPUT_INDEX = 3;
const OFFSET = 4;

const range = (start, end, length = end - start) => Array.from({ length }, (_, i) => start + i);
const product = (input1, input2) => input1.map(i => input2.map(j => [i, j])).flat();


const intcode = (noun, verb) => {
	const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(x => parseInt(x));

	const add = (x, y) => x + y;
	const multiply = (x, y) => x * y; 
	let counter = 0;
	let subset = input.slice(0, OFFSET);
	input[1] = noun;
	input[2] = verb;
	do {
		const operation = subset[OPCODE] === 1 ? add : multiply;
		input[subset[OUTPUT_INDEX]] = operation(input[subset[INPUT1]], input[subset[INPUT2]]);

		counter = counter + 1;
		subset = input.slice(OFFSET * counter, OFFSET * counter + OFFSET);
	} while (subset[OPCODE] !== 99);
	return input[0];
}

const part1 = () => intcode(12, 2);
console.log(`part1: ${part1()}`);

const part2 = () => {
	const possibilities = product(range(0,99), range(0, 99));
	for (let i = 0; i < possibilities.length; i++) {
		const result = intcode(...possibilities[i]);
		if (result === 19690720) {
			return 100 * possibilities[i][0] + possibilities[i][1];
		}
	}
}
console.log(`part2: ${part2()}`);

