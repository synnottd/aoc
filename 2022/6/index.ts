import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');

// const checkingLength = 3;
const checkingLength = 13;
const checking = file.substring(0, checkingLength).split('');

const doesContainDuplicates = (input: string[]) => {
    for (let i = 0; i < input.length; i += 1) {
        for (let j = i + 1; j < input.length; j += 1) {
            if (input[i] === input[j]) {
                return true;
            }
        }
    }
    return false;
};

for (let i = checking.length; i < file.length; i += 1) {
    if (checking.indexOf(file.charAt(i)) === -1 && !doesContainDuplicates(checking)) {
        console.log(checking);
        console.log(file.charAt(i));
        console.log(i + 1);
        break;
    }
    checking.shift();
    checking.push(file.charAt(i));
}
