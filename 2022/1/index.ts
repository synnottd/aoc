import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');

const stringElves = file.split(/\n\s*\n/);
const splitStringElf = stringElves.map((str) => str.split('\n'));
const numberListElves = splitStringElf
  .map((stringElf) => stringElf.map((stringCal) => parseInt(stringCal, 10)));
const totalCalsPerElf = numberListElves
  .map((numberListElf) => numberListElf.reduce((acc, curr) => acc + curr, 0));

// part 1 const maxElfCal = (list: number[]) => list.reduce((acc, curr) => Math.max(acc, curr), 0);

const getTop3 = (list: number[]) => list.reduce((acc, curr) => {
  const index = acc.findIndex((val) => curr > val);
  if (index > -1) {
    acc.splice(index, 0, curr);
    acc.pop();
  }
  return acc;
}, [0, 0, 0]);
console.log(getTop3(totalCalsPerElf).reduce((acc, curr) => acc + curr, 0));
