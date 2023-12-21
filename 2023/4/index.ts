import { readFileSync } from 'fs';

export function run() {
    const file = readFileSync(`${__dirname}/input.txt`).toString();
    const lines = file.split('\n');
    const values = lines.map(line => {
        return line.split(':')[1].split('|').map(s => s.trim().split(" ").map(Number).filter(n => n !== 0));
    });

    // p1
    // console.log(values.reduce((acc, [mine, winners]) => {
    //     const winCount = calcWins(mine, winners);
    //     return acc + (winCount > 0 ? Math.pow(2, winCount - 1) : 0);
    // }, 0))
    
    const winCounts = Array(values.length).fill(1);
    //p2
    values.forEach(([mine, winners], index) => {
        const winCount = calcWins(mine, winners);
        for (let i = 0; i < winCount; i++) {
            winCounts[index + 1 + i] = winCounts[index + 1 + i] + winCounts[index];
        }
    });

    console.log(winCounts.reduce((acc, curr) => acc + curr, 0));
}

function calcWins(mine: number[], winners: number[]) {
    return mine.reduce((acc, m) => winners.includes(m) ? acc + 1 : acc, 0);
}