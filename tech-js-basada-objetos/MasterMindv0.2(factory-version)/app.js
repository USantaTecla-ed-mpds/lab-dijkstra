const { Console } = require("console-mpds");
const console = new Console();

playMasterMind();

function playMasterMind() {
    let continueDialog = initYesNoDialog(`Do you want to continue?(y / n): `);
    do {
        const game = initGame();
        game.play();
        continueDialog.read();
    } while (continueDialog.isAffirmative());
}

function initGame() {
    return {
        COLORS: [`r`, `g`, `y`, `b`, `m`, `c`],
        COMBINATION_LENGTH: 4,
        MAX_ATTEMPTS: 10,
        secretCombination: initSecretCombination(),
        proposedCombination: initCombination(),
        board: initBoard(),

        play: function () {
            console.writeln(`----- MASTERMIND -----`);
            this.secretCombination.setCombination(this.COLORS, this.COMBINATION_LENGTH);
            let gameOver = false;
            do {
                this.proposedCombination.read(`Propose a combination:`, this.COLORS, this.COMBINATION_LENGTH);
                this.proposedCombination.getResults(this.secretCombination.combination);
                this.board.print(this.proposedCombination.results);
                if (this.secretCombination.answerIsWinner(this.proposedCombination.combination)) {
                    console.writeln(`¡¡¡You've won!!! ;-)!!!`);
                    gameOver = true;
                } else if (this.board.isMaxAttemps(this.MAX_ATTEMPTS)) {
                    console.writeln(`¡¡¡You've lost!!! :-(!!!`);
                    gameOver = true;
                }
            } while (!gameOver);
        }
    }
    return game;
}

function initSecretCombination() {
    return {
        combination: ``,
        setCombination: function (COLORS, COMBINATION_LENGTH) {
            let randomCombination = ``;
            do {
                let randomColor = COLORS[this.generateRandomIndex(COLORS)];
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
            this.combination = randomCombination;
        },

        generateRandomIndex: function (COLORS) {
            return parseInt(Math.random() * COLORS.length);
        },

        answerIsWinner: function (proposedCombination) {
            return proposedCombination === this.combination;
        },
    }
}

function initCombination() {
    return {
        combination: ``,
        results: [],

        read: function (title, COLORS, COMBINATION_LENGTH) {
            let combination, isWrongLenght, isWrongColorsCombination, isRepeatedColor;
            do {
                combination = console.readString(`${title}`);
                isWrongLenght = false;
                if (combination.length !== COMBINATION_LENGTH) {
                    isWrongLenght = true;
                    console.writeln(`Wrong proposed combination length`)
                } else {
                    isWrongColorsCombination = false;
                    isRepeatedColor = false;
                    for (let i = 0; !isWrongColorsCombination && !isRepeatedColor && i < COMBINATION_LENGTH; i++) {
                        if (this.isCorrectColor(combination[i], COLORS) == false) {
                            isWrongColorsCombination = true;
                            console.writeln(`Wrong color, they must be: rgybmc`);
                        } else if (this.isRepeated(combination, i) == true) {
                            isRepeatedColor = true;
                            console.writeln(`Repeated color ${combination[i]} try again`);
                        }
                    }
                }
            } while (isWrongLenght || isWrongColorsCombination || isRepeatedColor);
            this.combination = combination;
        },

        isCorrectColor: function (color, COLORS) {
            let correctColor = false;
            for (let i = 0; !correctColor && i < COLORS.length; i++) {
                correctColor |= COLORS[i] === color;
            }
            return correctColor;
        },

        isRepeated: function (combination, indexColor) {
            let repeated = false;
            for (let i = 0; !repeated && i < combination.length; i++) {
                repeated = combination[i] === combination[indexColor] && i !== indexColor;
            }
            return repeated;
        },

        getResults: function (secretCombination) {
            let blacks = 0;
            let whites = 0;
            for (i = 0; i < this.combination.length; i++) {
                for (j = 0; j < this.combination.length; j++) {
                    if (this.combination[i] === secretCombination[i] && i === j) {
                        blacks++;
                    } else if (this.combination[i] === secretCombination[j]) {
                        whites++;
                    }
                }
            }
            this.results = [this.combination, blacks, whites];
        }
    }
}

function initBoard() {
    return {
        lastedAttemptsResults: [],
        print: function (results) {
            this.lastedAttemptsResults.push(results);
            console.writeln(`\n${this.lastedAttemptsResults.length} attempt(s): `);
            console.writeln(`****`);
            for (let i = 0; i < this.lastedAttemptsResults.length; i++) {
                console.write(`${this.lastedAttemptsResults[i][0]} -- > ${this.lastedAttemptsResults[i][1]} blacks and ${this.lastedAttemptsResults[i][2]} whites\n`);
            }
        },

        isMaxAttemps: function (MAX_ATTEMPTS) {
            return this.lastedAttemptsResults.length === MAX_ATTEMPTS;
        }
    }
}

function initYesNoDialog(question) {
    return {
        question: question,
        answer: ``,

        read: function () {
            let error = false;
            do {
                answer = console.readString(this.question);
                error = !this.isAffirmative() && !this.isNegative();
                if (error) {
                    console.writeln(`Please, answer "y" o "n"`);
                }
            } while (error);
        },

        isAffirmative: function () {
            return answer === `y`;
        },

        isNegative: function () {
            return answer === `n`;
        }
    }
}
