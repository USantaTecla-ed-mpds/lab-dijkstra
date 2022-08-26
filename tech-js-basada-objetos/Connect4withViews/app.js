const { Console } = require("console-mpds");
const console = new Console();

initConnect4View().play();

function initConnect4View() {
    return {
        play() {
            const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
            do {
                initGameView().play();
                continueDialogView.read();
            } while (continueDialogView.isAffirmative());
        }
    }
}

function initYesNoDialogView(question) {
    let answer = ``;
    return {
        read() {
            let error;
            do {
                answer = console.readString(question);
                error = !this.isAffirmative() && !this.isNegative();
                if (error) {
                    console.writeln(`Please answer "yes" or "no"`);
                }
            } while (error);
        },
        isAffirmative() {
            return answer === `yes`;
        },
        isNegative() {
            return answer === `no`;
        }
    };
}

function initGameView() {
    let game = initGame();
    let boardView = initBoardView();
    let player = initPlayer();
    return {
        play() {
            console.writeln(`----- CONNECT4 -----`);
            do {
                this.showBoard();
                let token = boardView.getToken(player.getTurn());
                boardView.updateGrid(token);
                gameFinished = game.isWinner(token, boardView.getGrid()) || game.isTied(player.numberOfRounds);
                if (gameFinished) {
                    this.showBoard();
                    this.showFinalMsg(player.numberOfRounds, player.getTurn());
                }
                player.changeTurn();
            } while (!gameFinished);
        },
        showBoard() {
            boardView.showBoard();
        },
        showFinalMsg(numberOfRounds, lastActivePlayer) {
            initGame().isTied(numberOfRounds) ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${lastActivePlayer}`);
        }
    }
}

function initGame() {
    return {
        MAX_TOKENS: 42,
        isWinner(token, grid) {
            return initBoardView().isConnectedInHorizontal(token, grid)
                || initBoardView().isConnectedInVertical(token, grid)
                || initBoardView().isConnectedInDiagonal(token, grid);
        },
        isTied(numberOfRounds) {
            return numberOfRounds === this.MAX_TOKENS - 1; //numberOfRounds starts at 0
        }
    }
}

function initBoardView() {
    let token = initToken();
    let board = initBoard();
    return {
        showBoard() {
            for (let row = 0; row < board.grid.length; row++) {
                console.writeln(board.grid[row]);
            }
        },
        updateGrid(token) {
            board.grid[token.row][token.col] = token.owner;
        },
        getToken(player) {
            this.readColumn(player);
            return token;
        },
        getGrid() {
            return board.grid;
        },
        isConnectedInHorizontal(token, grid) {
            return board.isConnectedInHorizontal(token, grid);
        },
        isConnectedInVertical(token, grid) {
            return board.isConnectedInVertical(token, grid);
        },
        isConnectedInDiagonal(token, grid) {
            return board.isConnectedInDiagonal(token, grid);
        },
        readColumn(player) {
            let correctColumn;
            do {
                console.writeln(`--------------------------`);
                correctColumn = true;
                token.owner = player;
                token.col = console.readNumber(`Player ${player} Select column between (1 - 7)`);
                token.row = board.calculateRow(board.grid, token.col);
                if (1 > token.col || token.col > 7) {
                    console.writeln("Remember columns between 1 and 7");
                    correctColumn = false;
                } else if (token.row === undefined) {
                    console.writeln("This column is full");
                    correctColumn = false;
                }
            } while (!correctColumn);
        }
    }
}

function initBoard() {
    return {
        MIN_ROWS: 1,
        MIN_COLUMNS: 1,
        MAX_ROWS: 6,
        MAX_COLUMNS: 7,
        TOKENS_CONNECTED_FOR_WIN: 4,
        grid: [["*", "1", "2", "3", "4", "5", "6", "7"],
        ["1", "_", "_", "_", "_", "_", "_", "_"],
        ["2", "_", "_", "_", "_", "_", "_", "_"],
        ["3", "_", "_", "_", "_", "_", "_", "_"],
        ["4", "_", "_", "_", "_", "_", "_", "_"],
        ["5", "_", "_", "_", "_", "_", "_", "_"],
        ["6", "_", "_", "_", "_", "_", "_", "_"]],

        calculateRow(grid, col) {
            for (let row = grid.length - 1; row >= 0; row--) {
                if (grid[row][col] === "_") {
                    return row;
                }
            }
        },
        isConnectedInVertical(token, grid) {
            let countVertical = 0;
            for (let row = token.row; row <= this.MAX_ROWS; row++) {
                if (grid[row][token.col] === token.owner) {
                    countVertical++;
                    if (countVertical === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countVertical = 0;
                }
            }
        },
        isConnectedInHorizontal(token, grid) {
            let countHorizontal = 0;
            for (let col = this.MIN_COLUMNS; col <= this.MAX_COLUMNS; col++) {
                if (grid[token.row][col - 1] === token.owner) {
                    countHorizontal++;
                    if (countHorizontal === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countHorizontal = 0;
                }
            }
        },
        isConnectedInDiagonal(token, grid) {
            let countDiagonalRight = 0;
            for (let row = token.row, col = token.col; row <= this.MAX_ROWS & col >= this.MIN_COLUMNS; row++, col--) {
                if (grid[row][col] === token.owner) {
                    countDiagonalRight++;
                    if (countDiagonalRight === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countDiagonalRight = 0;
                }
            }
            let countDiagonalLeft = 0;
            for (let row = token.row, col = token.col; row <= this.MAX_ROWS && col <= this.MAX_COLUMNS; row++, col++) {
                if (grid[row][col] === token.owner) {
                    countDiagonalLeft++;
                    if (countDiagonalLeft === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countDiagonalLeft = 0;
                }
            }
        }
    }
}

function initToken() {
    return {
        row: undefined,
        col: undefined,
        owner: ""
    }
}

function initPlayer() {
    return {
        numberOfRounds: 0,
        player1: "X",
        player2: "O",
        getTurn() {
            return this.numberOfRounds % 2 === 0 ? this.player1 : this.player2;
        },
        changeTurn() {
            this.numberOfRounds++;
        }
    }
}
