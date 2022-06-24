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
    let game = {
        COLORS: [`r`, `g`, `y`, `b`, `m`, `c`],
        COMBINATION_LENGTH: 4,
        MAX_ATTEMPTS: 10,
        secretCombination: ``,
        proposedCombination: {},
        board: [],

        play: function () {
            this.generateSecretCombination();
            console.writeln(`----- MASTERMIND -----`);
            do {
                this.proposedCombination = initProposedCombination();
                this.proposedCombination.read(`Introduce una combinacion`, this.COLORS, this.COMBINATION_LENGTH);
                this.getResultsProposedCombination();
                this.updateBoard();
                this.printBoard();
                if (this.isWinner()) {
                    console.writeln(`¡¡¡You've won!!! ;-)!!!`);
                } else if (this.isMaxAttemps()) {
                    console.writeln(`¡¡¡You've lost!!! :-(!!!`);
                }
            } while (!this.isWinner() && !this.isMaxAttemps());
        },

        generateSecretCombination: function () {
            let randomCombination = ``;
            do {
                let randomColor = this.COLORS[generateRandomIndex(this.COLORS)];
                let isRepeatedColor = false;
                for (let i = 0; !isRepeatedColor && i < randomCombination.length; i++) {
                    if (randomCombination[i] === randomColor) {
                        isRepeatedColor = true;
                    }
                }
                if (!isRepeatedColor) {
                    randomCombination += randomColor;
                }
            } while (randomCombination.length != this.COMBINATION_LENGTH);
            this.secretCombination = randomCombination;

            function generateRandomIndex(COLORS) {
                return parseInt(Math.random() * COLORS.length);
            }
        },

        getResultsProposedCombination: function () {
            let blacks = 0;
            let whites = 0;
            for (i = 0; i < this.proposedCombination.combination.length; i++) {
                for (j = 0; j < this.proposedCombination.combination.length; j++) {
                    if (this.proposedCombination.combination[i] === this.secretCombination[i] && i === j) {
                        blacks++;
                    } else if (this.proposedCombination.combination[i] === this.secretCombination[j]) {
                        whites++;
                    }
                }
            }
            this.proposedCombination.results = [this.proposedCombination.combination, blacks, whites];
        },

        updateBoard: function () {
            this.board = [...this.board,
            this.proposedCombination.results];
        },

        printBoard: function () {
            console.writeln(`\n${this.board.length} attempt(s): `);
            console.writeln(`****`);
            for (let i = 0; i < this.board.length; i++) {
                console.write(`${this.board[i][0]} -- > ${this.board[i][1]} blacks and ${this.board[i][2]} whites\n`);;
            }
        },

        isWinner: function () {
            return this.proposedCombination.results[1] === this.COMBINATION_LENGTH;
        },

        isMaxAttemps: function () {
            return this.board.length === this.MAX_ATTEMPTS;
        }
    }
    return game;
}

function initProposedCombination() {
    return {
        combination: ``,

        read: function (title, COLORS, COMBINATION_LENGTH) {
            this.combination = read(`${title}`, COLORS, COMBINATION_LENGTH);
        }
    }

    function read(title, COLORS, COMBINATION_LENGTH) {
        let combination, isWrongLenght, isWrongColorsCombination, isRepeatedColor;
        do {
            combination = console.readString(`${title}: `);
            isWrongLenght = false;
            if (combination.length !== COMBINATION_LENGTH) {
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
