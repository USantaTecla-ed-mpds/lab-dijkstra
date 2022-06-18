const { Console } = require("console-mpds");
const console = new Console();

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
        let isWinner = false;
        const secretCombination = generateSecretCombination(COLORS, COMBINATION_LENGTH);

        console.writeln(`----- MASTERMIND -----`)

        do {
            const proposedCombination = askValidCombination(COLORS, COMBINATION_LENGTH);
            const resultsProposedCombination = getResults(proposedCombination, secretCombination);
            board = updateBoard(resultsProposedCombination, board);
            printBoard(board);
            if (board[board.length - 1][1] === COMBINATION_LENGTH) {
                isWinner = true;
                console.writeln(`¡¡¡You've won!!! ;-)!!!`);
            } else if (board.length === MAX_ATTEMPTS) {
                console.writeln(`¡¡¡You've lost!!! :-(!!!`);
            }
        } while (board.length < MAX_ATTEMPTS && !isWinner);

        function updateBoard(resultsProposedCombination, board) {
            let newBoard = [];
            newBoard = [...board,
            [resultsProposedCombination[0],
            resultsProposedCombination[1],
            resultsProposedCombination[2]]];
            return newBoard;
        }

        function printBoard(board) {
            console.writeln(`\n${board.length} attempt(s): `);
            console.writeln(`****`);
            for (let i = 0; i < board.length; i++) {
                console.write(`${board[i][0]} -- > ${board[i][1]} blacks and ${board[i][2]} whites\n`);;
            }
        }

        function generateSecretCombination(COLORS, COMBINATION_LENGTH) {
            let randomCombination = ``;
            do {
                let randomColor = COLORS[generateRandomIndex(COLORS)];
                let isRepeatedColor = false;
                for (let i = 0; !isRepeatedColor && i < randomCombination.length; i++) {
                    if (randomCombination[i] === randomColor) {
                        isRepeatedColor = true;
                    }
                }
                if (!isRepeatedColor) {
                    randomCombination += randomColor;
                }
            } while (randomCombination.length != COMBINATION_LENGTH);
            return randomCombination;
            function generateRandomIndex(COLORS) {
                return parseInt(Math.random() * COLORS.length);
            }
        }

        function askValidCombination(COLORS, COMBINATION_LENGTH) {
            let combination, isWrongLenght, isWrongColorsCombination, isRepeatedColor;
            do {
                combination = console.readString(`Propose a combination:`);
                isWrongLenght = false;
                if (combination.length != COMBINATION_LENGTH) {
                    isWrongLenght = true;
                    console.writeln(`Wrong proposed combination length`)
                } else {
                    isWrongColorsCombination = false;
                    isRepeatedColor = false;
                    for (let i = 0; !isWrongColorsCombination && !isRepeatedColor && i < COMBINATION_LENGTH; i++) {
                        if (isCorrectColor(combination[i], COLORS) == false) {
                            isWrongColorsCombination = true;
                            console.writeln(`Wrong color, they must be: rgybmc`);
                        } else if (isRepeated(combination, i) == true) {
                            isRepeatedColor = true;
                            console.writeln(`Repeated color ${combination[i]} try again`);
                        }
                    }
                }
            } while (isWrongLenght || isWrongColorsCombination || isRepeatedColor);
            return combination;

            function isRepeated(combination, indexColor) {
                let repeated = false;
                for (let i = 0; !repeated && i < combination.length; i++) {
                    repeated = combination[i] === combination[indexColor] && i !== indexColor;
                }
                return repeated;
            }

            function isCorrectColor(color, COLORS) {
                let correctColor = false;
                for (let i = 0; !correctColor && i < COLORS.length; i++) {
                    correctColor |= COLORS[i] === color;
                }
                return correctColor;
            }
        }

        function getResults(proposedCombination, secretCombination) {
            let msg = [];
            let blacks = 0;
            let whites = 0;
            for (i = 0; i < proposedCombination.length; i++) {
                for (j = 0; j < proposedCombination.length; j++) {
                    if (proposedCombination[i] === secretCombination[i] && i === j) {
                        blacks++;
                    } else if (proposedCombination[i] === secretCombination[j]) {
                        whites++;
                    }
                }
            }
            msg = [proposedCombination, blacks, whites];
            return msg;
        }
    }

    function isResumed() {
        let error = false;
        do {
            answer = console.readString(`Do you want to continue?(y / n): `);
            if (answer !== `y` && answer !== `n`) {
                error = true;
                console.writeln(`Please, answer "y" o "n"`);
            }
        } while (error);
        return answer === `y` ? true : false;
    }
}
