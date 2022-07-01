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
            if (game.isConnectFour("X")) {
                console.writeln(" Player X WINS!");
                isWinner = true;
            } else {
                game.readMovement("O");
                game.setMovement("O");
                if (game.isConnectFour("O")) {
                    console.writeln("Player O WINS!");
                    isWinner = true;
                }
            }
            if (game.totalMovesLeft === 0) {
                console.writeln("It's a TIE!");
            }
        } while (game.totalMovesLeft > 0 || isWinner === false);
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
        totalMovesLeft: this.rowNum * this.colNum,
        adjustCol: undefined,
        adjustRow: undefined,

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

        isConnectFour(color) {
            let fourCheckVert = 1;
            let distFromBottom = this.rowNum - 1 - this.adjustRow;
            let distFromTop = this.adjustRow;

            for (let check = 1; check <= distFromBottom; check++) {
                if (distFromBottom > 0) {
                    if (this.board[this.adjustRow + check][this.adjustCol] === color) {
                        fourCheckVert++;
                    } else {
                        break;
                    }
                }
            }

            for (let check = 1; check <= distFromTop; check++) {
                if (distFromTop > 0) {
                    if (this.board[this.adjustRow - check][this.adjustCol] === color) {
                        fourCheckVert++;
                    } else {
                        break;
                    }
                }
            }

            let fourCheckHor = 1;
            let distFromRight = this.colNum - 1 - this.adjustCol;
            let distFromLeft = this.adjustCol;

            for (let check = 1; check <= distFromRight; check++) {
                if (distFromRight > 0) {
                    if (this.board[this.adjustRow][this.adjustCol + check] === color) {
                        fourCheckHor++;
                    } else {
                        break;
                    }
                }
            }

            for (let check = 1; check <= distFromLeft; check++) {
                if (distFromLeft > 0) {
                    if (this.board[this.adjustRow][this.adjustCol - check] === color) {
                        fourCheckHor++;
                    } else {
                        break;
                    }
                }
            }

            let fourCheckDiagRight = 1;

            for (let check = 1; check <= distFromBottom; check++) {
                if (distFromBottom > 0) {
                    if (this.board[this.adjustRow + check][this.adjustCol + check] === color) {
                        fourCheckDiagRight++;
                    } else {
                        break;
                    }
                }
            }

            for (let check = 1; check <= distFromTop; check++) {
                if (distFromTop > 0) {
                    if (this.board[this.adjustRow - check][this.adjustCol - check] === color) {
                        fourCheckDiagRight++;
                    } else {
                        break;
                    }
                }
            }

            let fourCheckDiagLeft = 1;

            for (let check = 1; check <= distFromBottom; check++) {
                if (distFromBottom > 0) {
                    if (this.board[this.adjustRow + check][this.adjustCol - check] === color) {
                        fourCheckDiagLeft++;
                    } else {
                        break;
                    }
                }
            }

            for (let check = 1; check <= distFromTop; check++) {
                if (distFromTop > 0) {
                    if (this.board[this.adjustRow - check][this.adjustCol + check] === color) {
                        fourCheckDiagLeft++;
                    } else {
                        break;
                    }
                }
            }

            for (let i = 0; i < this.rowNum; i++) {
                console.writeln(this.board[i]);
            }

            console.writeln(`-----------------------------------------------------`);
            let winner = false;
            if ((fourCheckVert >= 4) || (fourCheckHor >= 4) || (fourCheckDiagRight >= 4) || (fourCheckDiagLeft >= 4)) {
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