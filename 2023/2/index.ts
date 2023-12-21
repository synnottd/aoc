import { readFileSync } from 'fs';
enum Color { Red, Blue, Green }
const maxColors = {
    [Color.Red]: 12,
    [Color.Blue]: 14,
    [Color.Green]: 13
}
function parseColor(colorString: string): Color {
    switch (colorString) {
        case 'red': return Color.Red;
        case 'blue': return Color.Blue;
        case 'green': return Color.Green;
        default:
            throw new Error(`Unknown color ${colorString}`);
    }
}

export function run() {
    const file = readFileSync(`${__dirname}/input.txt`).toString();
    const lines = file.split('\n');
    const input =
        lines.map(line => line.split(':').pop() ?? '')
            .map(gameLine => gameLine
                .split(';')
                .map(draw => draw.split(','))
                .map(colors => colors.map(color => color.trim().split(' '))
                    .map(colorSet => [Number(colorSet[0]), parseColor(colorSet[1])])
                )
            );
    const p1 = input.map(gameLine => {
        for (let drawIndex = 0; drawIndex < gameLine.length; drawIndex++) {
            const draw = gameLine[drawIndex];
            for (let colorIndex = 0; colorIndex < draw.length; colorIndex++) {
                const color = draw[colorIndex];
                if (color[0] > maxColors[color[1]]) {
                    return false;
                }
            }
        }
        return true;
    });
    console.log(input[0])
    const maxes = input.map(gameLine => gameLine.reduce(
        (acc, curr) => {
            curr.forEach(color => {
                acc[color[1]] = Math.max(acc[color[1]], color[0]);
            });
            return acc;
        }, [0, 0, 0]
    ));
    const lineVal = maxes.map(line => line[0] * line[1] * line[2]);
    console.log(lineVal.reduce((acc, curr) => acc + curr, 0));
}
