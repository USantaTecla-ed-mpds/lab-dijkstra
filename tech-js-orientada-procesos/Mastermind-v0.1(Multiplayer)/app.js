const { Console } = require("console-mpds");
const console = new Console();


playMasterMind();


function playMasterMind() {
    let player = 1;
    do {
        playGame();
        player++;
    } while (isResumed());

    function playGame() {
        const colors = [`r`, `g`, `y`, `b`, `m`, `c`];
        const secretCombination = getSecretCombination();
        let attemps = 0;
        let gotWinner = false;
        let msg = ``;

        console.writeln(`----- MASTERMIND -----`)

        do {
            let combination;
            combination = getValidCombination();
            if (checkCombination(combination)) {
                gotWinner = true;
                console.writeln(`¡¡¡Player ${player % 2 === 1 ? 1 : 2} You've won this round!!! ;-)!!!`)
            } else if (attemps === 10)
                console.writeln(`¡¡¡Player ${player % 2 === 1 ? 1 : 2} You've lost this round!!! :-(!!!`)
            else {
                attemps++;
                console.writeln(`\n${attemps} attempt(s): `);
                console.writeln(`*********`);
                console.write(msg);
            }
        } while (attemps < 10 && !gotWinner);

        function getSecretCombination() {
            console.writeln(`Hello Player ${player % 2 === 1 ? 1 : 2}, your work in this round will be easy`)
            combination = console.readString(`¡¡¡Write the secret combination of colors (r, g, y, b, m, c)!!!`);
            player++;
            return combination;
        }

        function getValidCombination() {
            let proposedCombination;
            let isValidCombination;
            do {
                proposedCombination = console.readString(`Player ${player % 2 === 1 ? 1 : 2} Propose a combination:`);
                if (proposedCombination.length != 4) {
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
                }
            } while (!isValidCombination);
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
            msg += `${combination} --> ${blacks / 4} blacks and ${whites} whites\n`;
        }
    }
}

function isResumed() {
    let result;
    let answer;
    let error = false;
    do {
        answer = console.readString(`Player ${player % 2 === 0 ? 1 : 2} Do you want to continue the play? (y/n): `);
        result = answer === `y`;
        error = !result && answer !== `n`;
        if (error) {
            console.writeln(`Please, answer "y" o "n"`);
        }
    } while (error);
    return result;
}
