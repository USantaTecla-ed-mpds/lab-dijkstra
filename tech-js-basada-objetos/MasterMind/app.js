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

        play() {
            console.writeln(`----- MASTERMIND -----`);
            this.secretCombination.setSecretCombination(this.COLORS, this.COMBINATION_LENGTH);
            let gameFinished = false;
            do {
                this.proposedCombination.read(`Propose a combination:`, this.COLORS, this.COMBINATION_LENGTH);
                this.printResults(this.proposedCombination.proposedCombinations)
                if (this.secretCombination.isWinner(this.proposedCombination.proposedCombinations[this.proposedCombination.proposedCombinations.length - 1], this.COMBINATION_LENGTH)) {
                    console.writeln(`¡¡¡You've won!!! ;-)!!!`);
                    gameFinished = true;
                } else if (this.isLooser()) {
                    console.writeln(`¡¡¡You've lost!!! :-(!!!`);
                    gameFinished = true;
                }
            } while (!gameFinished);
        },

        isLooser() {
            return this.proposedCombination.proposedCombinations.length === this.MAX_ATTEMPTS;
        },

        printResults(combination) {
            console.writeln(`\n${combination.length} attempt(s): `);
            console.writeln(`****`);
            for (let i = 0; i < combination.length; i++) {
                console.write(`${combination[i]} -- > ${this.secretCombination.calculateResults(this.proposedCombination.proposedCombinations[i]).blacks} blacks and ${this.secretCombination.calculateResults(this.proposedCombination.proposedCombinations[i]).whites} whites\n`);;
            }
        }
    }
}

function initSecretCombination() {
    return {
        secretCombination: ``,

        setSecretCombination(COLORS, COMBINATION_LENGTH) {
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
            this.secretCombination = randomCombination;
        },

        calculateResults(proposedCombination) {
            let blacks = 0;
            let whites = 0;
            for (i = 0; i < proposedCombination.length; i++) {
                for (j = 0; j < proposedCombination.length; j++) {
                    if (proposedCombination[i] === this.secretCombination[i] && i === j) {
                        blacks++;
                    } else if (proposedCombination[i] === this.secretCombination[j]) {
                        whites++;
                    }
                }
            }
            return { blacks: blacks, whites: whites };
        },
        generateRandomIndex(COLORS) {
            return parseInt(Math.random() * COLORS.length);
        },

        isWinner(combination, length) {
            return this.calculateResults(combination).blacks === length;
        },
    }
}

function initCombination() {
    return {
        proposedCombinations: [],

        read(title, COLORS, COMBINATION_LENGTH) {
            let combination;
            let validCombination;
            do {
                combination = console.readString(`${title}`);
                validCombination = true;
                if (!this.isCorrectLenght(combination, COMBINATION_LENGTH)) {
                    console.writeln(`Wrong proposed combination length`)
                    validCombination = false;
                } else {
                    for (let i = 0; validCombination && i < COMBINATION_LENGTH; i++) {
                        if (this.isCorrectColor(combination[i], COLORS) == false) {
                            console.writeln(`Wrong color, they must be: rgybmc`);
                            validCombination = false;
                        } else if (this.isRepeated(combination, i) == true) {
                            console.writeln(`Repeated color ${combination[i]} try again`);
                            validCombination = false;
                        }
                    }
                }
            } while (!validCombination);
            this.proposedCombinations.push(combination);
        },

        isCorrectLenght(combination, COMBINATION_LENGTH) {
            return combination.length === COMBINATION_LENGTH;
        },

        isCorrectColor(color, COLORS) {
            let correctColor = false;
            for (let i = 0; !correctColor && i < COLORS.length; i++) {
                correctColor ||= COLORS[i] === color;
            }
            return correctColor;
        },

        isRepeated(combination, indexColor) {
            let repeated = false;
            for (let i = 0; !repeated && i < combination.length; i++) {
                repeated = combination[i] === combination[indexColor] && i !== indexColor;
            }
            return repeated;
        }
    }
}

function initYesNoDialog(question) {
    return {
        question: question,
        answer: ``,

        read() {
            let error = false;
            do {
                answer = console.readString(this.question);
                error = !this.isAffirmative() && !this.isNegative();
                if (error) {
                    console.writeln(`Please, answer "y" o "n"`);
                }
            } while (error);
        },

        isAffirmative() {
            return answer === `y`;
        },

        isNegative() {
            return answer === `n`;
        }
    }
}
