import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');

const lines = file.split(/\n/);

let numberIndex = 0;
while (lines[numberIndex].charAt(1) !== '1') {
    numberIndex += 1;
}

const stackIndexes: number[] = Array.from(lines[numberIndex].matchAll(/\d/g)).map((match) => match.index as number);
const stacks: string[][] = stackIndexes.map(() => []);

for (let stacksPointer = numberIndex - 1; stacksPointer >= 0; stacksPointer -= 1) {
    for (let i = 0; i < stacks.length; i += 1) {
        const crate = lines[stacksPointer].charAt(stackIndexes[i]);
        if (crate.trim()) {
            stacks[i].push(crate);
        }
    }
}
for (let movesPointer = numberIndex + 2; movesPointer < lines.length; movesPointer += 1) {
    const move = lines[movesPointer].match(/\d+/g)?.map((i) => parseInt(i, 10));
    if (!move) {
        throw new Error('AHHHHH');
    }
    // Part 1
    // for (let i = 0; i < move[0]; i += 1) {
    //     stacks[move[2] - 1].push(stacks[move[1] - 1].pop() ?? '');
    // }

    // Part 2
    stacks[move[2] - 1] = [
        ...stacks[move[2] - 1],
        ...stacks[move[1] - 1].splice(-move[0], move[0]),
    ];
}
console.log(stacks.map((stack) => stack.pop()).join(''));
