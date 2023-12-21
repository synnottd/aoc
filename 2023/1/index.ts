import { readFileSync } from 'fs';

export function run() {
    const file = readFileSync(`${__dirname}/input.txt`).toString();
    const lines = file.split('\n');
    const regex = /[1-9]|one|two|three|four|five|six|seven|eight|nine/;
    const regex2 = /(.*)([1-9]|one|two|three|four|five|six|seven|eight|nine)/;
    const matches = lines.map(
        line => `${convert(getMatch(line, regex))}${convert(getMatch(line, regex2, true))}`
    );
    lines.forEach((line, index) => {
        console.log(`${index + 1}: ${line} => ${matches[index]}`);
    });
    console.log(
        matches
            .map(Number)
            .reduce((acc, curr) => acc + curr, 0));

}


function convert(input: string): string {
    switch (input) {
        case 'one': return '1';
        case 'two': return '2'
        case 'three': return '3';
        case 'four': return '4';
        case 'five': return '5';
        case 'six': return '6';
        case 'seven': return '7';
        case 'eight': return '8';
        case 'nine': return '9';
        default:
            return input;
    }
}

function getMatch(input, regex: RegExp, grouping = false) {
    const match = regex.exec(input);
    console.log(match);
    if (match) {
        return grouping ? match[2] : match[0];
    }
    throw new Error(`No match found for ${input} and ${regex}`);
}