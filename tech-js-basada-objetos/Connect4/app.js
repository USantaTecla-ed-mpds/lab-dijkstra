const { Console } = require("console-mpds");
const console = new Console();

playConnectFour();

function playConnectFour() {
    let continueDialog = initYesNoDialog(`Do you want to continue?(y / n): `);
    do {
        const game = initGame();
        let isWinner = false;
        game.welcome();
        do {
            game.readMovement("X");
            game.setMovement("X")
            game.printBoard();
            if (game.isConnectFour("X")) {
                console.writeln(" Player X WINS!");
                isWinner = true;
            } else {
                game.readMovement("O");
                game.setMovement("O");
                game.printBoard();
                if (game.isConnectFour("O")) {
                    console.writeln("Player O WINS!");
                    isWinner = true;
                }
            }
            if (game.totalMovesLeft === 0) {
                console.writeln("It's a TIE!");
            }
        } while (game.totalMovesLeft > 0 && !isWinner);
        continueDialog.read();
    } while (continueDialog.isAffirmative());
}

function initGame() {
    let game = {
        board: [["*", "1", "2", "3", "4", "5", "6", "7"],
        ["1", "_", "_", "_", "_", "_", "_", "_"],
        ["2", "_", "_", "_", "_", "_", "_", "_"],
        ["3", "_", "_", "_", "_", "_", "_", "_"],
        ["4", "_", "_", "_", "_", "_", "_", "_"],
        ["5", "_", "_", "_", "_", "_", "_", "_"],
        ["6", "_", "_", "_", "_", "_", "_", "_"]],
        rowNum: 6,
        colNum: 7,
        totalMovesLeft: 42,
        adjustCol: undefined,
        adjustRow: undefined,
        connected: 4,

        welcome() {
            console.writeln(`Welcome to Connect 4 \n`)
            for (let row = 0; row < this.rowNum + 1; row++) {
                console.writeln(this.board[row]);
            }
        },

        readMovement(color) {
            let correctColumn;
            do {
                correctColumn = true;
                console.writeln(`--------------------------`);
                this.move = console.readNumber(`Player ${color} Select column between (1 - 7)`);
                if (1 > this.move || this.move > 7) {
                    console.writeln("Remenber columns between 1 and 7");
                    correctColumn = false;
                } else if (this.board[1][this.move] !== "_") {
                    console.writeln("Column is full");
                    correctColumn = false;
                }
            } while (!correctColumn);
        },

        setMovement(color) {
            this.adjustCol = this.move;
            this.adjustRow = 1;
            this.rowNum = 7;

            for (let row = 0; row < this.rowNum; row++) {
                if (this.board[row][this.adjustCol] === "_") {
                    this.adjustRow = row;
                }
            }
            this.totalMovesLeft--;
            this.board[this.adjustRow][this.adjustCol] = color;
        },

        printBoard() {
            for (let i = 0; i < this.rowNum; i++) {
                console.writeln(this.board[i]);
            }
        },

        isConnectFour(color) {
            let fourCheckVert = 1;
            let distFromBottom = this.rowNum - this.adjustRow - 1;
            let distFromTop = this.adjustRow;

            let continueCheckVert = true;
            for (let i = 1; continueCheckVert && i <= distFromBottom; i++) {
                if (distFromBottom > 0) {
                    if (this.board[this.adjustRow + i][this.adjustCol] === color) {
                        fourCheckVert++;
                    } else {
                        continueCheckVert = false;
                    }
                }
            }

            continueCheckVert = true;
            for (let i = 1; continueCheckVert && i <= distFromTop; i++) {
                if (distFromTop > 0) {
                    if (this.board[this.adjustRow - i][this.adjustCol] === color) {
                        fourCheckVert++;
                    } else {
                        continueCheckVert = false;
                    }
                }
            }

            let fourCheckHor = 1;
            let distFromRight = this.colNum - this.adjustCol - 1;
            let distFromLeft = this.adjustCol;

            let continueCheckHor = true;
            for (let i = 1; continueCheckHor && i <= distFromRight; i++) {
                if (distFromRight > 0) {
                    if (this.board[this.adjustRow][this.adjustCol + i] === color) {
                        fourCheckHor++;
                    } else {
                        continueCheckHor = false;
                    }
                }
            }

            continueCheckHor = true;
            for (let i = 1; continueCheckHor && i <= distFromLeft; i++) {
                if (distFromLeft > 0) {
                    if (this.board[this.adjustRow][this.adjustCol - i] === color) {
                        fourCheckHor++;
                    } else {
                        continueCheckHor = false;
                    }
                }
            }

            let fourCheckDiagRight = 1;

            let continueCheckDiagRight = true;
            for (let i = 1; i <= distFromBottom; i++) {
                if (distFromBottom > 0) {
                    if (this.board[this.adjustRow + i][this.adjustCol + i] === color) {
                        fourCheckDiagRight++;
                    } else {
                        continueCheckDiagRight = false;
                    }
                }
            }

            continueCheckDiagRight = true;
            for (let i = 1; continueCheckDiagRight && i <= distFromTop; i++) {
                if (distFromTop > 0) {
                    if (this.board[this.adjustRow - i][this.adjustCol - i] === color) {
                        fourCheckDiagRight++;
                    } else {
                        continueCheckDiagRight = false;
                    }
                }
            }

            let fourCheckDiagLeft = 1;

            let continueCheckDiagLeft = true;
            for (let i = 1; continueCheckDiagLeft && i <= distFromBottom; i++) {
                if (distFromBottom > 0) {
                    if (this.board[this.adjustRow + i][this.adjustCol - i] === color) {
                        fourCheckDiagLeft++;
                    } else {
                        continueCheckDiagLeft = false;
                    }
                }
            }

            continueCheckDiagLeft = true;
            for (let i = 1; continueCheckDiagLeft && i <= distFromTop; i++) {
                if (distFromTop > 0) {
                    if (this.board[this.adjustRow - i][this.adjustCol + i] === color) {
                        fourCheckDiagLeft++;
                    } else {
                        continueCheckDiagLeft = false;
                    }
                }
            }

            let winner = false;
            if ((fourCheckVert >= this.connected) || (fourCheckHor >= this.connected) || (fourCheckDiagRight >= this.connected) || (fourCheckDiagLeft >= this.connected)) {
                winner = true;
            }
            return winner;
        }
    }
    return game;
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