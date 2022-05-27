const { Console } = require("console-mpds");
const console = new Console();

playMasterMind();

function playMasterMind() {
    do {
        playGame();
    } while (isResumed());

    function playGame() {
        const colors = [`r`, `g`, `y`, `b`, `m`, `c`];
        const combinationLength = 4;
        let attemps = 0;
        const maxAttemps = 10;
        let gotWinner = false;
        let msg = ``;
        const secretCombination = getSecretCombination();
        console.writeln(secretCombination);

        console.writeln(`----- MASTERMIND -----`)

        do {
            let combination;
            combination = getValidCombination();
            if (checkCombination(combination)) {
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

        function getSecretCombination() {
            let isRepeatedColor = true;
            let randomCombination;
            do {
                randomCombination = ``;
                for (let k = 0; k < combinationLength; k++) {
                    randomCombination += colors[parseInt(Math.random() * 6)];
                }
                isRepeatedColor = true;
                for (i = 0; i < combinationLength - 1; i++) {
                    for (j = i + 1; j < combinationLength; j++) {
                        isRepeatedColor &= randomCombination[i] != randomCombination[j];
                    }
                }
            } while (!isRepeatedColor);
            return randomCombination;
        }

        function getValidCombination() {
            let proposedCombination;
            let isValidCombination;
            do {
                proposedCombination = console.readString(`Propose a combination:`);
                if (proposedCombination.length != combinationLength) {
                    console.writeln(`Wrong proposed combination length`)
                }
                else {
                    isValidCombination = true;
                    for (let i = 0; isValidCombination && i <= 3; i++) {
                        let j;
                        let foundColor = false;
                        for (j = 0; j <= 5; j++) {
                            if (proposedCombination[i] === colors[j]) {
                                foundColor = true;
                            }
                        }
                        if (!foundColor && j === colors.length) {
                            isValidCombination = false;
                            console.writeln(`Wrong colors, they must be: rgybmc`);
                        }
                    }
                    isRepeatedColor = true;
                    for (i = 0; i < combinationLength - 1; i++) {
                        for (j = i + 1; j < combinationLength; j++) {
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

        function checkCombination(combination) {
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
            msg += `${combination} -- > ${blacks / combinationLength} blacks and ${whites} whites\n`;
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
