import { readFileSync } from 'fs';

type Index = [number, number];
type IndexPair = [Index, Index];

const isNumber = (input: string): boolean => input >= '0' && input <= '9';
const isDot = (input: string): boolean => input === '.';
const isGear = (input: string): boolean => input === '*';
const isSymbol = (input: string): boolean => !isNumber(input) && !isDot(input);
function getNextThing(start: Index, grid: string[][], isThing: (input: string) => boolean): Index {
    let isFirst = true;
    for (let row = start[0]; row < grid.length; row++) {
        for (let col = isFirst ? start[1] : 0; col < grid[row].length; col++) {
            if (isThing(grid[row][col])) {
                return [row, col];
            }
        }
        isFirst = false;
    }
    throw new Error(`No digit found after ${start}`);
}
function getNextNumber(start: Index, grid: string[][], maxCol?: number): IndexPair {
    const begin = getNextThing(start, grid, isNumber);
    let col = begin[1];
    for (; col < (maxCol ?? grid[begin[0]].length); col++) {
        if (!isNumber(grid[begin[0]][col])) {
            break;
        }
    }
    return [begin, [begin[0], col - 1]];
}
function checkRangeForSymbol(row: number, colRange: Index, grid: string[][]): boolean {
    for (let col = colRange[0]; col <= colRange[1]; col++) {
        if (isSymbol(grid[row][col])) {
            return true;
        }
    }
    return false;
}
function doesTouchSymbol(number: IndexPair, grid: string[][]): boolean {
    const atTop = number[0][0] === 0;
    const atBottom = number[0][0] === grid.length - 1;
    const atLeft = number[0][1] === 0;
    const atRight = number[1][1] === grid[number[0][0]].length - 1;
    if (!atTop) {
        const row = number[0][0] - 1; 
        const colRange: Index = [atLeft ?  number[0][1] : number[0][1] - 1, atRight ? number[1][1]: number[1][1] + 1];
        if (checkRangeForSymbol(row, colRange, grid)) {
            return true;
        }
    }

    if (!atLeft) {
        if (isSymbol(grid[number[0][0]][number[0][1] - 1])) {
            return true;
        }
    }

    if (!atRight) {
        if (isSymbol(grid[number[0][0]][number[1][1] + 1])) {
            return true;
        }
    }

    if (!atBottom) {
        const row = number[0][0] + 1; 
        const colRange: Index = [atLeft ?  number[0][1] : number[0][1] - 1, atRight ? number[1][1]: number[1][1] + 1];
        if (checkRangeForSymbol(row, colRange, grid)) {
            return true;
        }
    }
    
    return false;
}

function getNum(range: IndexPair, grid: string[][]): number {
    let numStrig = '';
    for (let col = range[0][1]; col <= range[1][1]; col++) {
        numStrig += grid[range[0][0]][col];
    }
    return Number(numStrig);
}

function getNextIndex(i: Index, colLength: number): Index {
    return i[1] < (colLength - 1) ? [i[0], i[1] + 1] : [i[0] + 1, 0];
}

function getFullNumberLocation(aDigit: Index, grid: string[][]): IndexPair {
    const atTop = aDigit[0] === 0;
    const atBottom = aDigit[0] === grid.length - 1;
    const atLeft = aDigit[1] === 0;
    const atRight = aDigit[1] === grid[aDigit[0]].length - 1;
    let startDigitCol = aDigit[1];
    while (isNumber(grid[aDigit[0]][startDigitCol]) && startDigitCol >= 0) {
        startDigitCol--;
    }
    startDigitCol++;
    let endDigitCol = aDigit[1];
    while (isNumber(grid[aDigit[0]][endDigitCol]) && endDigitCol <= grid[aDigit[0]].length - 1) {
        endDigitCol++;
    }
    return [[aDigit[0], startDigitCol], [aDigit[0], endDigitCol - 1]];
}

function getGearSum(gear: Index, grid: string[][]): number {

    const nums: number[] = [];
    const atTop = gear[0] === 0;
    const atBottom = gear[0] === grid.length - 1;
    const atLeft = gear[1] === 0;
    const atRight = gear[1] === grid[gear[0]].length - 1;
    if (!atTop) {
        const row = gear[0] - 1; 
        let searchCol = atLeft ?  gear[1] : gear[1] - 1;
        while (searchCol <= (atRight ? gear[1]: gear[1] + 1)) {
            if (isNumber(grid[row][searchCol])) {
                const numLoc = getFullNumberLocation([row, searchCol], grid);
                const num = getNum(numLoc, grid);
                nums.push(num);
                if(numLoc[1][1] >= gear[1]) {
                    break;
                } else {
                    searchCol = gear[1] + 1;
                }
            } else {
                searchCol++;
            }
        }
    }
    if (!atLeft) {
        if (isNumber(grid[gear[0]][gear[1] - 1])) {
            if (nums.length === 2) {
                return 0;
            }
            const numLoc = getFullNumberLocation([gear[0], gear[1] - 1], grid);
            const num = getNum(numLoc, grid);
            nums.push(num);
        }
    }

    if (!atRight) {
        if (isNumber(grid[gear[0]][gear[1] + 1])) {
            if (nums.length === 2) {
                return 0;
            }
            const numLoc = getFullNumberLocation([gear[0], gear[1] + 1], grid);
            const num = getNum(numLoc, grid);
            nums.push(num);
        }
    }

    if (!atBottom) {
        const row = gear[0] + 1; 
        let searchCol = atLeft ?  gear[1] : gear[1] - 1;
        while (searchCol <= (atRight ? gear[1]: gear[1] + 1)) {
            if (isNumber(grid[row][searchCol])) {
                if (nums.length === 2) {
                    return 0;
                }
                const numLoc = getFullNumberLocation([row, searchCol], grid);
                const num = getNum(numLoc, grid);
                nums.push(num);
                if(numLoc[1][1] >= gear[1]) {
                    break;
                } else {
                    searchCol = gear[1] + 1;
                }
            } else {
                searchCol++;
            }
        }
    }
    
    if (nums.length === 2) {
        return nums[0] * nums[1];
    }
    return 0;
}

export function run() {
    const file = readFileSync(`${__dirname}/input.txt`).toString();
    const grid = file.split('\n').map(line => line.split(''));
    // let sumP1 = 0
    // let p: Index = [0, 0]
    // while (true) {
    //     try {
    //         const next = getNextNumber(p, grid);
    //         if (doesTouchSymbol(next, grid)) {
    //             const num = getNum(next, grid);
    //             sumP1 += num;
    //         }
    //         p = getNextIndex(next[1], grid[0].length);
    //         if (p[0] >= grid.length) {
    //             break;
    //         }
    //     } catch (e) {
    //         break;
    //     }        
    // }
    let sumP2 = 0
    let p: Index = [0, 0]
    while (true) {
        try {
            const nextGear: Index = getNextThing(p, grid, isGear);
            sumP2 += getGearSum(nextGear, grid);
            p = getNextIndex(nextGear, grid[0].length);
            if (p[0] >= grid.length) {
                break;
            }
        } catch (e) {
            break;
        }        
    }
    console.log(sumP2)

}
