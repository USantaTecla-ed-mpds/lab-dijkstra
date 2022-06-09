const { Console } = require("console-mpds");
const console = new Console();

//MasterMindv1.0

playMasterMind();

function playMasterMind() {
    do {
        playGame();
    } while (isResumed());

    function playGame() {
        const COLORS = [`r`, `g`, `y`, `b`, `m`, `c`];
        const COMBINATION_LENGTH = 4;
        const MAX_ATTEMPTS = 10;
        let board = [];
        const secretCombination = generateSecretCombination(COLORS, COMBINATION_LENGTH);
        console.writeln(`----- MASTERMIND -----`)
        do {
            combination = askValidProposedCombination(COLORS, COMBINATION_LENGTH);
            board.push(getAttempResults(combination, secretCombination));
            console.writeln(`\n${board.length} attempt(s): `);
            console.writeln(`****`);
            showResults(board);
            if (board[board.length - 1][1] === 4) {
                console.writeln(`¡¡¡You've won!!! ;-)!!!`);
            } else if (board.length === MAX_ATTEMPTS) {
                console.writeln(`¡¡¡You've lost!!! :-(!!!`);
            }
        } while (board.length < MAX_ATTEMPTS && board[board.length - 1][1] !== 4);
        function showResults(board) {
            for (let i = 0; i < board.length; i++) {
                console.write(`${board[i][0]} -- > ${board[i][1]} blacks and ${board[i][2]} whites\n`);;
            }
        }
        function generateSecretCombination(COLORS, COMBINATION_LENGTH) {
            let randomCombination;
            let isRepeatedColor;
            do {
                isRepeatedColor = false;
                randomCombination = ``;
                for (let k = 0; k <= COMBINATION_LENGTH - 1; k++) {
                    randomCombination += COLORS[generateRandomIndex(COLORS)];
                }
                function generateRandomIndex(COLORS) {
                    return parseInt(Math.random() * COLORS.length);
                }
                for (let i = 0; !isRepeatedColor && i < COMBINATION_LENGTH; i++) {
                    if (isRepeated(randomCombination[i], randomCombination, i)) {
                        isRepeatedColor = true;
                    }
                }
            } while (isRepeatedColor);
            return randomCombination;
        }
        function askValidProposedCombination(COLORS, COMBINATION_LENGTH) {
            let proposedCombination, isWrongLenght, isInvalidCombination, isRepeatedColor;
            do {
                proposedCombination = console.readString(`Propose a combination:`);
                isWrongLenght = false;
                isInvalidCombination = false;
                isRepeatedColor = false;
                if (proposedCombination.length != COMBINATION_LENGTH) {
                    isWrongLenght = true;
                    console.writeln(`Wrong proposed combination length`)
                } else {
                    for (let i = 0; !isInvalidCombination && !isRepeatedColor && i < COMBINATION_LENGTH; i++) {
                        if (isCorrectColor(proposedCombination[i], COLORS) == false) {
                            isInvalidCombination = true;
                            console.writeln(`Wrong color, they must be: rgybmc`);
                        } else if (isRepeated(proposedCombination[i], proposedCombination, i) == true) {
                            isRepeatedColor = true;
                            console.writeln(`Repeated color ${proposedCombination[i]} try again`);
                        }
                    }
                }
            } while (isInvalidCombination || isRepeatedColor || isWrongLenght);
            return proposedCombination;
        }
        function isRepeated(proposedColor, proposedCombination, indexColor) {
            let repeated = false;
            for (let i = 0; !repeated && i < proposedCombination.length; i++) {
                repeated = proposedCombination[i] === proposedColor && i !== indexColor;
            }
            return repeated;
        }
        function isCorrectColor(proposedColor, COLORS) {
            let correctColor = false;
            for (let i = 0; !correctColor && i < COLORS.length; i++) {
                correctColor |= COLORS[i] === proposedColor;
            }
            return correctColor;
        }
        function getAttempResults(combination, secretCombination) {
            let msg = [];
            let blacks = 0;
            let whites = 0;
            for (i = 0; i < combination.length; i++) {
                for (j = 0; j < combination.length; j++) {
                    if (combination[i] === secretCombination[i] && i === j) {
                        blacks++;
                    } else if (combination[i] === secretCombination[j]) {
                        whites++;
                    }
                }
            }
            msg = [combination, blacks, whites];
            return msg;
        }
    }
    function isResumed() {
        let result;
        let error = true;
        do {
            answer = console.readString(`Do you want to continue?(y / n): `);
            if (answer === `y` || answer === `n`) {
                result = answer === `y` ? true : false;
                error = false;
            } else {
                console.writeln(`Please, answer "y" o "n"`);
            }
        } while (error);
        return result;
    }
}
