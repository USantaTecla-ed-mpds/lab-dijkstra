const { Console } = require("console-mpds");
const console = new Console();

Draughts();

function Draughts() {
    let continueDialog = initYesNoDialog(`¿Do you want to continue? "yes" or "no"`);
    do {
        const game = initGame();
        game.play();
        continueDialog.read();
    } while (continueDialog.isAffirmative());
}

function initGame() {
    let game = {
        turn: 0,
        MAX_PLAYERS: 2,
        TOKEN_X: "X",
        TOKEN_Y: "Y",
        TOKEN_EMPTY: "_",
        MAX_ROWS_COLUMNS: 8,
        tokens_X: 12,
        tokens_Y: 12,
        board: [["_", "Y", "_", "Y", "_", "Y", "_", "Y"],
        ["Y", "_", "Y", "_", "Y", "_", "Y", "_"],
        ["_", "Y", "_", "Y", "_", "Y", "_", "Y"],
        ["_", "_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_", "_"],
        ["X", "_", "X", "_", "X", "_", "X", "_"],
        ["_", "X", "_", "X", "_", "X", "_", "X"],
        ["X", "_", "X", "_", "X", "_", "X", "_"]],


        play: function () {
            do {
                this.writelnBoard();
                this.placeToken();
                if (this.tokens_Y > 0) {
                    this.nextTurn();
                }
                console.writeln(`There are ${this.tokens_X} tokens left`);
                console.writeln(`There are ${this.tokens_Y} tokens left`);
            } while (this.tokens_X > 0 && this.tokens_Y > 0);
            this.writelnBoard();
            this.writeWinner();
        },

        writelnBoard: function () {
            for (let i = 0; i < this.board.length; i++) {
                console.writeln(this.board[i]);
            }
        },

        placeToken: function () {
            console.writeln(`Turn for ${this.getToken()}`);
            let error;
            let origin;
            do {
                origin = initCoordinate();
                origin.read('origin', this.MAX_ROWS_COLUMNS);
                error = !this.isOccupied(origin, this.getToken());
                if (error) {
                    console.writeln(`There isn't token property of ${this.getToken()}`);
                }
            } while (error);

            let target;
            let validMovement;
            do {
                target = initCoordinate();
                target.read('destiny', this.MAX_ROWS_COLUMNS);
                let jump = !this.isEmpty(target);
                validMovement = this.isMovement(target);
                if (jump && this.getToken() === this.TOKEN_X) {
                    this.putEmptyToken(origin);
                    this.putEmptyToken(target);
                    this.tokens_Y--;
                    if (this.directionMovement(origin, target) === 1) {
                        target.row = target.row - 1;
                        target.column = target.column + 1;
                        this.putToken(target, this.getToken());
                    } else {
                        target.row = target.row - 1;
                        target.column = target.column - 1;
                        this.putToken(target, this.getToken());
                    }
                } else if (jump && this.getToken() === this.TOKEN_Y) {
                    this.putEmptyToken(origin);
                    this.putEmptyToken(target);
                    this.tokens_X--;
                    if (this.directionMovement(origin, target) === 1) {
                        target.row = target.row + 1;
                        target.column = target.column + 1;
                        this.putToken(target, this.getToken());
                    } else {
                        target.row = target.row + 1;
                        target.column = target.column - 1;
                        this.putToken(target, this.getToken());
                    }
                } else if (!validMovement) {
                    console.writeln(`Invalid movement`);
                } else if (!jump && validMovement) {
                    this.putEmptyToken(origin);
                    this.putToken(target, this.getToken());
                }
            } while (!validMovement);
        },

        isMovement: function ({ row, column }) {
            return (row + column) % 2 === 1;
        },

        nextTurn: function () {
            this.turn = (this.turn + 1) % this.MAX_PLAYERS;
        },

        directionMovement: function (origin, target) {
            return target.column > origin.column ? 1 : -1;
        },
        putEmptyToken: function (coordinate) {
            this.putToken(coordinate, this.TOKEN_EMPTY);
        },

        putToken: function (coordinate, color) {
            this.board[coordinate.row][coordinate.column] = color;
        },

        isEmpty: function ({ row, column }) {
            return this.board[row][column] === this.TOKEN_EMPTY;
        },

        getToken: function () {
            return this.turn === 0 ? this.TOKEN_Y : this.TOKEN_X;
        },

        isOccupied: function (coordinate, color) {
            return this.board[coordinate.row][coordinate.column] === color;
        },

        writeWinner: function () {
            console.writeln(`Winner is ${this.getToken()}`);
        },
    }
    return game;
}

function initCoordinate() {
    return {
        row: undefined,
        column: undefined,

        read: function (title, max) {
            this.row = read(`Row ${title}`, max);
            this.column = read(`Column ${title}`, max);
        }
    };

    function read(title, max) {
        let position;
        let error;
        do {
            position = console.readNumber(`${title}: `);
            error = position < 1 || max < position;
            if (error) {
                console.writeln(`Please enter a number between 1 and ${max} both included`)
            }
        } while (error);
        return position - 1;
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
                    console.writeln(`Please answer with "yes" or "no"`);
                }
            } while (error);
        },

        isAffirmative: function () {
            return answer === `yes`;
        },

        isNegative: function () {
            return answer === `no`;
        }
    };
}