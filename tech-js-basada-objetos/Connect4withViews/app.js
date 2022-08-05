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
                gameFinished = initGame().isEndGame(coordinate, boardView.board.grid, player.turn);
                if (gameFinished) {
                    this.showBoard();
                    this.showFinalMsg(player.getTurn(), game.MAX_MOVEMENTS, player.turn);
                } else {
                    player.changeTurn();
                }
            } while (!gameFinished);
        },
        showBoard() {
            initBoardView().showBoard(boardView.board.grid);
        },
        showFinalMsg(lastActivePlayer, MAX_MOVEMENTS, turn) {
            turn === MAX_MOVEMENTS ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${lastActivePlayer}`);
        }
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

function initBoard() {
    return {
        MIN_ROWS: 1,
        MIN_COLUMNS: 1,
        MAX_ROWS: 6,
        MAX_COLUMNS: 7,
        NUMBER_CONNECTIONS: 4,
        grid: [["*", "1", "2", "3", "4", "5", "6", "7"],
        ["1", "_", "_", "_", "_", "_", "_", "_"],
        ["2", "_", "_", "_", "_", "_", "_", "_"],
        ["3", "_", "_", "_", "_", "_", "_", "_"],
        ["4", "_", "_", "_", "_", "_", "_", "_"],
        ["5", "_", "_", "_", "_", "_", "_", "_"],
        ["6", "_", "_", "_", "_", "_", "_", "_"]],

        isConnectedInVertical(coordinate, grid) {
            let countVertical = 0;
            for (let row = coordinate.row; row <= this.MAX_ROWS; row++) {
                if (grid[row][coordinate.col] === coordinate.owner) {
                    countVertical++;
                } else {
                    countVertical = 0;
                }
            }
            return countVertical === this.NUMBER_CONNECTIONS;
        },
        isConnectedInHorizontal(coordinate, grid) {
            let countHorizontal = 0;
            for (let col = this.MIN_COLUMNS; col <= this.MAX_COLUMNS; col++) {
                if (grid[coordinate.row][col - 1] === coordinate.owner) {
                    countHorizontal++;
                } else {
                    countHorizontal = 0;
                }
            }
            return countHorizontal === this.NUMBER_CONNECTIONS;
        },
        isConnectedInDiagonal(coordinate, grid) {
            let countDiagonalRight = 0;
            for (let row = coordinate.row, col = coordinate.col; row <= this.MAX_ROWS & col >= this.MIN_COLUMNS; row++, col--) {
                if (grid[row][col] === coordinate.owner) {
                    countDiagonalRight++;
                } else {
                    countDiagonalRight = 0;
                }
            }
            let countDiagonalLeft = 0;
            for (let row = coordinate.row, col = coordinate.col; row <= this.MAX_ROWS && col <= this.MAX_COLUMNS; row++, col++) {
                if (grid[row][col] === coordinate.owner) {
                    countDiagonalLeft++;
                } else {
                    countDiagonalLeft = 0;
                }
            }
            return countDiagonalLeft === this.NUMBER_CONNECTIONS || countDiagonalRight === this.NUMBER_CONNECTIONS;
        }
    }
}

function initBoardView() {
    let board = initBoard();
    return {
        board,
        showBoard(grid) {
            for (let row = 0; row < grid.length; row++) {
                console.writeln(grid[row]);
            }
        },
        readColumn(player, grid) { //separate readColumn() and getCoordinate()
            let correctColumn;
            let coordinate = initCoordinate();
            do {
                correctColumn = true;
                console.writeln(`--------------------------`);
                coordinate.col = console.readNumber(`Player ${player} Select column between (1 - 7)`);
                for (let row = grid.length - 1; row >= 0; row--) {
                    if (grid[row][coordinate.col] === "_") {
                        coordinate.row = row;
                        break;
                    }
                }
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

function initCoordinate() {
    return {
        row: undefined,
        col: undefined,
        owner: ""
    }
}

function initGame() {
    return {
        MAX_MOVEMENTS: 42,
        updateGrid(coordinate, grid) {
            grid[coordinate.row][coordinate.col] = coordinate.owner;
            return grid;
        },
        isEndGame(coordinate, grid, turn) {
            return this.isWinner(coordinate, grid) || this.isTied(turn);
        },
        isWinner(coordinate, grid) {
            return initBoardView().board.isConnectedInHorizontal(coordinate, grid)
                || initBoardView().board.isConnectedInVertical(coordinate, grid)
                || initBoardView().board.isConnectedInDiagonal(coordinate, grid)
        },
        isTied(turn) {
            return this.MAX_MOVEMENTS === turn;
        }
    }
}