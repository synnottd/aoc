const fs = require('fs');

const parseInput = (input) => input.split('\n')
									.map(instructionSet => instructionSet.split(',').map(
										instruction => ({
											direction: instruction.charAt(0),
											distance: parseInt(instruction.substring(1))
										})
									));

const funFor = (min, max, fun, step = 1) => { for (let i = min; i < max; i += step) fun(i) }
const paths = parseInput(fs.readFileSync('/Users/dsynnott/personal/adventofcode/3/input.txt', 'utf8'));

const insert = (grid, { x, y } , value) => {
	if (grid[x] === undefined) {
		grid[x] = [];
	}
	grid[x][y] = value;
}

const createFirst = (grid, move, currentPos) => {
	const moveInX = ['R', 'L'].includes(move.direction);
	const isPositive = ['R', 'U'].includes(move.direction);
	funFor(0, move.distance, () => {
		currentPos[moveInX ? 'x' : 'y'] += isPositive ? 1 : -1;
		currentPos.step++;
		insert(grid, currentPos, currentPos.step);
	});
}

const handleOtherWire = (grid, move, currentPos) => {
	const moveInX = ['R', 'L'].includes(move.direction);
	const isPositive = ['R', 'U'].includes(move.direction);
	let intersections = []; 
	funFor(0, move.distance, () => {
		currentPos[moveInX ? 'x' : 'y'] += isPositive ? 1 : -1;
		currentPos.step++;
		if (grid[currentPos.x] && grid[currentPos.x][currentPos.y]) {
			intersections.push(grid[currentPos.x][currentPos.y] + currentPos.step);
		}
	});
	return intersections;
}



const getIntersections = (moveSets) => {
	const grid = [];
	let currentPos = {x : 0, y: 0, step: 0};
	moveSets[0].forEach(move => createFirst(grid, move, currentPos));
	currentPos = {x : 0, y: 0, step: 0};
	return moveSets[1].map(move => handleOtherWire(grid, move, currentPos)).flat();
}


const wireIntersection = (as, bs) => {
	return as.filter(bs.some())
}

const intersections = getIntersections(paths);
// const dists = intersections.map(point => Math.abs(point.x) + Math.abs(point.y));
const closest = Math.min(...intersections);

