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
    const game = initGame();
    let boardView = initBoardView();
    let player = initPlayer();
    return {
        play() {
            console.writeln(`----- CONNECT4 -----`);
            let coordinate;
            do {
                this.showBoard();
                coordinate = initBoardView().readColumn(player.getTurn(), boardView.board.grid);
                coordinate.owner = player.getTurn();
                boardView.board.grid = game.updateGrid(coordinate, boardView.board.grid);
                gameFinished = initGame().isWinner(coordinate, boardView.board.grid) || initGame().isTied(player.turn);
                if (gameFinished) {
                    this.showBoard();
                    this.showFinalMsg(player.turn, coordinate.owner);
                }
                player.changeTurn();
            } while (!gameFinished);
        },
        showBoard() {
            initBoardView().showBoard(boardView.board.grid);
        },
        showFinalMsg(turn, lastActivePlayer) {
            initGame().isTied(turn) ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${lastActivePlayer}`);
        }
    }
}

function initGame() {
    return {
        MAX_TOKENS: 42,
        updateGrid(coordinate, grid) {
            grid[coordinate.row][coordinate.col] = coordinate.owner;
            return grid;
        },
        isWinner(coordinate, grid) {
            return initBoardView().board.isConnectedInHorizontal(coordinate, grid)
                || initBoardView().board.isConnectedInVertical(coordinate, grid)
                || initBoardView().board.isConnectedInDiagonal(coordinate, grid)
        },
        isTied(turn) {
            return turn === this.MAX_TOKENS - 1; //Turn starts at 0
        }
    }
}

function initBoardView() {
    return {
        board: initBoard(),
        showBoard(grid) {
            for (let row = 0; row < grid.length; row++) {
                console.writeln(grid[row]);
            }
        },
        readColumn(player, grid) {
            let correctColumn;
            let coordinate = initCoordinate();
            do {
                console.writeln(`--------------------------`);
                correctColumn = true;
                coordinate.col = console.readNumber(`Player ${player} Select column between (1 - 7)`);
                coordinate.row = this.board.calculateRow(grid, coordinate.col);
                if (1 > coordinate.col || coordinate.col > 7) {
                    console.writeln("Remember columns between 1 and 7");
                    correctColumn = false;
                } else if (coordinate.row === undefined) {
                    console.writeln("This column is full");
                    correctColumn = false;
                }
            } while (!correctColumn);
            return coordinate;
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
        isConnectedInVertical(coordinate, grid) {
            let countVertical = 0;
            for (let row = coordinate.row; row <= this.MAX_ROWS; row++) {
                if (grid[row][coordinate.col] === coordinate.owner) {
                    countVertical++;
                    if (countVertical === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countVertical = 0;
                }
            }
        },
        isConnectedInHorizontal(coordinate, grid) {
            let countHorizontal = 0;
            for (let col = this.MIN_COLUMNS; col <= this.MAX_COLUMNS; col++) {
                if (grid[coordinate.row][col - 1] === coordinate.owner) {
                    countHorizontal++;
                    if (countHorizontal === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countHorizontal = 0;
                }
            }
        },
        isConnectedInDiagonal(coordinate, grid) {
            let countDiagonalRight = 0;
            for (let row = coordinate.row, col = coordinate.col; row <= this.MAX_ROWS & col >= this.MIN_COLUMNS; row++, col--) {
                if (grid[row][col] === coordinate.owner) {
                    countDiagonalRight++;
                    if (countDiagonalRight === this.TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countDiagonalRight = 0;
                }
            }
            let countDiagonalLeft = 0;
            for (let row = coordinate.row, col = coordinate.col; row <= this.MAX_ROWS && col <= this.MAX_COLUMNS; row++, col++) {
                if (grid[row][col] === coordinate.owner) {
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

function initCoordinate() {
    return {
        row: undefined,
        col: undefined,
        owner: ""
    }
}

function initPlayer() {
    return {
        turn: 0,
        player1: "X",
        player2: "O",
        getTurn() {
            return this.turn % 2 === 0 ? this.player1 : this.player2;
        },
        changeTurn() {
            this.turn++;
        }
    }
}
