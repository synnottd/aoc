"use strict";

const add = (x, y) => x + y;
const multiply = (x, y) => x * y; 

const getOffset = oppCode => oppCode < 3 ? 4 : 2;

const ADD = 1;
const MULTIPLY = 2;
const INPUT = 3
const OUTPUT = 4;

const parseOppcode = oppcode => {
	const seperated = Array.from(String(oppcode), Number);
	return {
		oppcode: seperated[seperated.length - 1] + (seperated[seperated.length - 2] || 0) * 10,
		mode1: seperated[seperated.length - 3] || 0,
		mode2: seperated[seperated.length - 4] || 0,
		mode3: seperated[seperated.length - 5] || 0,
	}
}

const addMultiply = (fn, instructions, program) => {
	
}

const intcode = (input = 1) => {
	const OPCODE = 0;
	
	
	const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(x => parseInt(x));

	
	let pointer = 0;
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