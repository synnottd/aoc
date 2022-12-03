import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');
const lines = file.split(/\n/);

const getCrossover = ([line, ...rest]: string[]): string[] => {
    let crossover;
    const letters: { [index: string]: boolean } = {};
    for (let i = 0; i < line.length / 2; i += 1) {
        letters[line.charAt(i)] = true;
    }
    for (let i = line.length / 2; i < line.length; i += 1) {
        if (letters[line.charAt(i)]) {
            crossover = line.charAt(i);
        }
    }
    if (!crossover) {
        throw new Error('Not found');
    }
    if (rest.length > 0) {
        return [crossover, ...getCrossover(rest)];
    }
    return [crossover];
};

const getPriority = (letter: string): number => {
    const charCode = letter.charCodeAt(0);
    if (charCode >= 97) {
        return charCode - 96;
    }
    return charCode - 38;
};

// part 1: console.log(getCrossover(lines).map(getPriority).reduce((acc, curr) => acc + curr, 0));
const removeDuplicates = (str: string): string => {
    const letters: { [i: string]: boolean } = {};
    str.split('').forEach((l) => { letters[l] = true; });
    return Object.keys(letters).join('');
};
const getCrossover3 = ([o, t, th, ...rest]: string[]): string[] => {
    let crossover;
    const letters: { [index: string]: number } = {};
    const one = removeDuplicates(o);
    const two = removeDuplicates(t);
    const three = removeDuplicates(th);
    for (let i = 0; i < one.length; i += 1) {
        letters[one.charAt(i)] = letters[one.charAt(i)] ? letters[one.charAt(i)] + 1 : 1;
    }
    for (let i = 0; i < two.length; i += 1) {
        letters[two.charAt(i)] = letters[two.charAt(i)] ? letters[two.charAt(i)] + 1 : 1;
    }
    for (let i = 0; i < three.length; i += 1) {
        letters[three.charAt(i)] = letters[three.charAt(i)] ? letters[three.charAt(i)] + 1 : 1;
    }
    Object.entries(letters).forEach(([letter, count]) => {
        if (count === 3) {
            // if (crossover !== undefined) {
            //     throw new Error('Not found');
            // }
            crossover = letter;
        }
    });
    if (crossover === undefined) {
        throw new Error('Not found');
    }
    if (rest.length > 0) {
        return [crossover, ...getCrossover3(rest)];
    }
    return [crossover];
};
// console.log(lines);
// console.log(getCrossover3(lines));
console.log(getCrossover3(lines).map(getPriority).reduce((acc, curr) => acc + curr, 0));
