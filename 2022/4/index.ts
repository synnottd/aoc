import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');

type Pair = [number, number];
const pairs: [Pair, Pair][] = file.split(/\n/).map((line) => line.split(',').map((pair) => pair.split('-').map((n) => parseInt(n, 10)))) as [Pair, Pair][];

const isInside = ([smallL, smallR]: Pair, [bigL, bigR]: Pair): boolean => bigL <= smallL
    && bigR >= smallR;
const orderPairsInMaginitude = ([oneL, oneR]: Pair, [twoL, twoR]: Pair): [Pair, Pair] => (
    oneR - oneL > twoR - twoL ? [[oneL, oneR], [twoL, twoR]] : [[twoL, twoR], [oneL, oneR]]
);
const isOverlapping = ([smallL, smallR]: Pair, [bigL, bigR]: Pair)
: boolean => isInside([smallL, smallR], [bigL, bigR])
    || (smallL >= bigL && smallL <= bigR) || (smallR >= bigL && smallR <= bigR);

// part 1
console.log(pairs.map(([one, two]) => {
    const [bigger, smaller] = orderPairsInMaginitude(one, two);
    return isInside(smaller, bigger) ? 1 : 0;
}).reduce((acc: number, next) => acc + next, 0));
// part 2
console.log(pairs.map(([one, two]) => {
    const [bigger, smaller] = orderPairsInMaginitude(one, two);
    return isOverlapping(smaller, bigger) ? 1 : 0;
}).reduce((acc: number, next) => acc + next, 0));
