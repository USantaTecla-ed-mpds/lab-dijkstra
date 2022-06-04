const { Console } = require("console-mpds");
const console = new Console();

//MasterMind-v0.0

playMasterMind();

function playMasterMind() {
    do {
        playGame();
    } while (isResumed());

    function playGame() {
        const COLORS = [`r`, `g`, `y`, `b`, `m`, `c`];
        const COMBINATION_LENGTH = 4;
        let attemps = 0;
        const maxAttemps = 10;
        let gotWinner = false;
        let msg = ``;
        const secretCombination = generateSecretCombination(COLORS, COMBINATION_LENGTH);

        console.writeln(`----- MASTERMIND -----`)

        do {
            let combination;
            combination = checkValidProposedCombination(COLORS, COMBINATION_LENGTH);
            if (showGameResults(combination, secretCombination, COMBINATION_LENGTH)) {
                gotWinner = true;
                console.writeln(`¡¡¡You've won!!! ;-)!!!`)
            } else if (attemps === maxAttemps)
                console.writeln(`¡¡¡You've lost!!! :-(!!!`)
            else {
                console.writeln(`\n${attemps} attempt(s): `);
                console.writeln(`*********`);
                console.write(msg);
            }
        } while (attemps < maxAttemps && !gotWinner);

        function generateSecretCombination(COLORS, COMBINATION_LENGTH) {
            let randomCombination;
            let isRepeatedColor;
            do {
                isRepeatedColor = false;
                randomCombination = ``;
                for (let k = 0; k <= COMBINATION_LENGTH - 1; k++) {
                    randomCombination += COLORS[generateRandomColor(COLORS)];
                }

                for (let i = 0; !isRepeatedColor && i < COMBINATION_LENGTH - 1; i++) {
                    if (isRepeated(randomCombination[i], randomCombination, i))
                        isRepeatedColor = true;
                }
            } while (isRepeatedColor);
            return randomCombination;
        }

        function generateRandomColor(COLORS) {
            return parseInt(Math.random() * COLORS.length);
        }

        function isRepeated(proposedColor, proposedCombination, indexColor) {
            let repeated = false;
            for (let i = 0; i < proposedCombination.length && !repeated; i++) {
                repeated = proposedCombination[i] === proposedColor && i !== indexColor;
            }
            return repeated;
        }

        function checkValidProposedCombination(COLORS, COMBINATION_LENGTH) {
            let proposedCombination;
            let isValidCombination;
            do {
                proposedCombination = console.readString(`Propose a combination:`);
                if (proposedCombination.length != COMBINATION_LENGTH) {
                    console.writeln(`Wrong proposed combination length`)
                }
                else {
                    isValidCombination = true;
                    for (let i = 0; isValidCombination && i <= 3; i++) {
                        let j;
                        let foundColor = false;
                        for (j = 0; j <= 5; j++) {
                            if (proposedCombination[i] === COLORS[j]) {
                                foundColor = true;
                            }
                        }
                        if (!foundColor && j === COLORS.length) {
                            isValidCombination = false;
                            console.writeln(`Wrong color, they must be: rgybmc`);
                        }
                    }
                    isRepeatedColor = true;
                    for (i = 0; i < COMBINATION_LENGTH - 1; i++) {
                        for (j = i + 1; j < COMBINATION_LENGTH; j++) {
                            isRepeatedColor &= proposedCombination[i] != proposedCombination[j];
                        }
                    }
                    if (!isRepeatedColor) {
                        isValidCombination = false;
                        console.writeln(`Repeated color ${proposedCombination[i]} try again`);
                    }

                }
            } while (!isValidCombination);
            attemps++;
            return proposedCombination;
        }

        function showGameResults(combination, secretCombination, COMBINATION_LENGTH) {
            if (combination === secretCombination)
                return true;
            let blacks = 0;
            let whites = 0;
            for (i = 0; i <= 3; i++) {
                for (j = 0; j <= 3; j++) {
                    if (combination[i] === secretCombination[i])
                        blacks++;
                    else if (combination[i] === secretCombination[j])
                        whites++;
                }
            }
            msg += `${combination} -- > ${blacks / COMBINATION_LENGTH} blacks and ${whites} whites\n`;
        }
    }
}

function isResumed() {
    let result;
    let answer;
    let error = false;
    do {
        answer = console.readString(`Do you want to continue?(y / n): `);
        result = answer === `y`;
        error = !result && answer !== `n`;
        if (error) {
            console.writeln(`Please, answer "y" o "n"`);
        }
    } while (error);
    return result;
}