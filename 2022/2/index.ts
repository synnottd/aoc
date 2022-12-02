import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');
const input = file.split(/\n/).map((line) => line.split(/\s/));

enum Winner { Me, Them, Draw}

const movesAreSame = (theirMove: string, myMove: string): boolean => myMove.charCodeAt(0) - theirMove.charCodeAt(0) === 23;


const whoWins = (theirMove: string, myMove: string): Winner => {
    if (movesAreSame(theirMove, myMove)) {
        return Winner.Draw;
    }
    if (theirMove === 'A') {
        return myMove === 'Y' ? Winner.Me : Winner.Them;
    }

    if (theirMove === 'B') {
        return myMove === 'Z' ? Winner.Me : Winner.Them;
    }

    return myMove === 'X' ? Winner.Me : Winner.Them;
};

const pointForResult = (result: Winner): number => {
    if (result === Winner.Me) {
        return 6;
    }

    if (result === Winner.Draw) {
        return 3;
    }
    return 0;
}

const pointForMyCharMove = (myMove: string): number => myMove.charCodeAt(0) - 87;

const getWrongMatchPoints = (theirMove: string, myMove: string) => pointForResult(whoWins(theirMove, myMove)) + pointForMyCharMove(myMove);

// part 1: console.log(input.reduce((acc, pair) => getWrongMatchPoints(pair[0], pair[1]) + acc, 0));

enum Move { Rock, Paper, Scissor}
const pointForMyMove = (myMove: Move): number => {
    if (myMove === Move.Rock) return 1;
    if (myMove === Move.Paper) return 2;
    return 3;
}

const getMatchPointsFromResult = (result: Winner) => {
    if (result === Winner.Me) return 1;
    if (result === Winner.Draw) return 2;
    return 0;
}


const getMyMove = (theirMove: string, result: Winner): Move => {
    if (Winner.Draw === result) {
        if (theirMove === 'A') {
            return Move.Rock;
        }
        if (theirMove === 'B') {
            return Move.Paper;
        }
        return Move.Scissor;
    }

    if (Winner.Me === result) {
        if (theirMove === 'A') {
            return Move.Paper;
        }
        if (theirMove === 'B') {
            return Move.Scissor;
        }
        return Move.Rock;
    }


        if (theirMove === 'A') {
            return Move.Scissor;
        }
        if (theirMove === 'B') {
            return Move.Rock;
        }
        return Move.Paper;

}

const codeToResult = (code: string) => {
    if (code === 'X') {
        return Winner.Them;
    }

    if (code === 'Y'){
        return Winner.Draw;
    }
    return Winner.Me;
}

const getMatchPoints = (theirMove: string, result: string) =>
    pointForResult(codeToResult(result)) + pointForMyMove(getMyMove(theirMove, codeToResult(result) ));


console.log(input.reduce((acc, pair) => getMatchPoints(pair[0], pair[1]) + acc, 0));
