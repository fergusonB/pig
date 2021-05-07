function main() {
    console.log(`Welcome to the game of pig.\n
    For each roll of the dice, your score goes up.\n
    The goal is to get your score as high as you can each round.\n
    If you roll a 1, your score for the round is zero.\n
    You can stop after any non-1 roll to preserve your score for that round.\n
    The objective is to get to the desired score before the other players.`);

    const players: string[] = createPlayers();

    let scores = assignScoresTo(players);

    const scoreBeingPlayedTo: number = getWinningScore();

    let whoseTurn = 0;
    while (Math.max(...Object.values(scores)) < scoreBeingPlayedTo) {
        [scores, whoseTurn] = playRound(
            players,
            scores,
            whoseTurn,
            scoreBeingPlayedTo
        );
        console.log(
            `The scores are now${JSON.stringify(scores)
                .replaceAll('"', " ")
                .replace("{", "")
                .replace("}", "")}\n`
        );
    }

    console.log(
        Object.entries(scores).filter(
            (player) => player[1] > scoreBeingPlayedTo
        )[0][0] + " wins!"
    );
}

function playRound(
    players: string[],
    scores: LooseObject,
    whoseTurn: number,
    scoreBeingPlayedTo: number
): [LooseObject, number] {
    let roundScore = 0;
    let roundRoll = roll();
    roundScore += roundRoll;

    let again = prompt(
        `${players[whoseTurn]}, your first roll is ${roundRoll}. Would you like to roll again? (y/n): `
    );

    while (again === "y") {
        roundRoll = roll();
        if (roundRoll === 1) {
            roundScore = 0;
            again = null;
            console.log(
                `You rolled a 1, your round score has been set to 0 and your turn is over.`
            );
        } else {
            roundScore += roundRoll;
            if (roundScore + scores[players[whoseTurn]] > scoreBeingPlayedTo) {
                again = null;
                break;
            }
            again = prompt(
                `You rolled ${roundRoll}, your round score is now ${roundScore}. Would you like to roll again? (y/n): `
            );
        }
    }

    scores[players[whoseTurn]] += roundScore;

    whoseTurn = nextTurn(whoseTurn, players.length);
    return [scores, whoseTurn];
}

function nextTurn(index: number, playerCount: number): number {
    return (index + 1) % playerCount;
}

function roll(): number {
    return 1 + Math.floor(Math.random() * 6);
}

function createPlayers(): string[] {
    const players = prompt(`How many players would you like?: `);
    if (players === null || Number(players) < 1 ){
        console.log('You must enter a valid number.')
        return createPlayers()
    }
    const numberPlayers = Number(players);
    if (!isNaN(numberPlayers)) {
        const arr = new Array(numberPlayers);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = prompt(`Player ${i + 1} name: `);
        }
        if (new Set(arr).size !== arr.length) {
            console.log(`You can't use the same name for multiple players.`);
            return createPlayers();
        }
        return arr.map((i) => i[0].toUpperCase() + i.slice(1)) ?? arr;
    } else {
        console.log("You must enter a number.");
        return createPlayers();
    }
}

function assignScoresTo(players: string[]): LooseObject {
    const scores: LooseObject = {};
    for (const name of players) {
        scores[name] = 0;
    }
    return scores;
}

function getWinningScore(): number {
    const desiredScore = prompt("What should the winning score be?: ");
    const numberDesiredScore = Number(desiredScore);
    if (isNaN(numberDesiredScore) || numberDesiredScore < 1) return getWinningScore();
    return numberDesiredScore;
}

interface LooseObject {
    [key: string]: number;
}

main();
