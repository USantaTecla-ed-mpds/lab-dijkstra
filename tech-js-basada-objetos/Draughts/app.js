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
            console.writeln(`Turn for ${this.getToken()}`); //TODO Turn for NaN en kingTokens
            let error;
            let origin;
            do {
                origin = initCoordinate();
                origin.read('origin', this.MAX_ROWS_COLUMNS);
                error = !this.isOccupied(origin, this.getToken());
                kingToken = this.isOccupied(origin, "X2") || this.isOccupied(origin, "Y2");
                if (kingToken) {
                    error = false;
                }
                else if (error) {
                    console.writeln(`There isn't token property of ${this.getToken()}`);
                }
            } while (error);

            let target;
            let validMovement;
            let direcctionAllowedX = true;
            let direcctionAllowedY = true;
            let impossibleJump;
            let kingTokenMoved;
            do {
                kingTokenMoved = false;
                impossibleJump = false;
                target = initCoordinate();
                target.read('destiny', this.MAX_ROWS_COLUMNS);
                let outOfLimitsBoard = target.row > 0 && target.row < this.MAX_ROWS_COLUMNS - 1 && target.column > 0 && target.column < this.MAX_ROWS_COLUMNS - 1;
                let jump = !this.isEmpty(target) && outOfLimitsBoard;
                direcctionAllowedX = this.isDirecctionAllowedX(origin, target);
                direcctionAllowedY = this.isDirecctionAllowedY(origin, target);
                validMovement = this.isMovement(target);
                if (jump && validMovement && this.board[origin.row][origin.column] === "X2") {
                    console.writeln(`Mueve ficha X2 y come ficha Y`);
                    this.putEmptyToken(origin);
                    this.putToken(target, "X2");
                    this.TOKEN_Y--;
                    kingTokenMoved = true;
                } else if (jump && validMovement && this.board[origin.row][origin.column] === "Y2") {
                    console.writeln(`Mueve ficha Y2 y come ficha X`);
                    this.putEmptyToken(origin);
                    this.putToken(target, "Y2");
                    this.tokens_X--;
                    kingTokenMoved = true;
                } else if (!jump && validMovement && this.board[origin.row][origin.column] === "X2") {
                    console.writeln(`Mueve ficha X2`);
                    this.putEmptyToken(origin);
                    this.putToken(target, "X2");
                    kingTokenMoved = true;
                } else if (!jump && validMovement && this.board[origin.row][origin.column] === "Y2") {
                    console.writeln(`Mueve ficha Y2`);
                    this.putEmptyToken(origin);
                    this.putToken(target, "Y2");
                    kingTokenMoved = true;
                } else if (jump && this.getToken() === this.TOKEN_X) {
                    this.putEmptyToken(origin);
                    this.putEmptyToken(target);
                    this.tokens_Y--;
                    if (this.directionMovement(origin, target)) {
                        console.writeln(`Salta y come ficha Y`);
                        target.row = target.row - 1;
                        target.column = target.column + 1;
                        this.putToken(target, this.getToken());
                        if (target.row === 0 || target.row === this.MAX_ROWS_COLUMNS - 1) {
                            console.writeln(`Salta,come ficha Y y se convierte en rey`);
                            this.putToken(target, this.getToken() === this.TOKEN_X ? this.TOKEN_X = "X2" : this.TOKEN_Y = "Y2");
                        }
                    } else {
                        console.writeln(`Salta y come ficha Y`)
                        target.row = target.row - 1;
                        target.column = target.column - 1;
                        this.putToken(target, this.getToken());
                        if (target.row === 0 || target.row === this.MAX_ROWS_COLUMNS - 1) {
                            console.writeln(`Salta,come ficha Y y se convierte en rey`);
                            this.putToken(target, this.getToken() === this.TOKEN_X ? this.TOKEN_X = "X2" : this.TOKEN_Y = "Y2");
                        }
                    }
                } else if (jump && this.getToken() === this.TOKEN_Y) {
                    this.putEmptyToken(origin);
                    this.putEmptyToken(target);
                    this.tokens_X--;
                    if (this.directionMovement(origin, target)) {
                        console.writeln(`Salta y come ficha X`);
                        target.row = target.row + 1;
                        target.column = target.column + 1;
                        this.putToken(target, this.getToken());
                        if (target.row === 0 || target.row === this.MAX_ROWS_COLUMNS - 1) {
                            console.writeln(`Salta,come ficha X y se convierte en rey`);
                            this.putToken(target, this.getToken() === this.TOKEN_X ? this.TOKEN_X = "X2" : this.TOKEN_Y = "Y2");
                        }
                    } else {
                        console.writeln(`Salta y come ficha X`)
                        target.row = target.row + 1;
                        target.column = target.column - 1;
                        this.putToken(target, this.getToken());
                        if (target.row === 0 || target.row === this.MAX_ROWS_COLUMNS - 1) {
                            console.writeln(`Salta,come ficha X y se convierte en rey`);
                            this.putToken(target, this.getToken() === this.TOKEN_X ? "X2" : "Y2");
                        }
                    }
                } else if (!this.isEmpty(target) && !outOfLimitsBoard) {
                    impossibleJump = true;
                    console.writeln(`Invalid movement`);
                } else if (!jump && validMovement && (this.getToken() === this.TOKEN_X ? direcctionAllowedX : direcctionAllowedY)) {
                    console.writeln(`Mueve ficha`);
                    this.putEmptyToken(origin);
                    this.putToken(target, this.getToken());
                    if (target.row === 0 || target.row === this.MAX_ROWS_COLUMNS - 1) {
                        console.writeln(`Mueve ficha y se convierte en rey`);
                        this.putToken(target, this.getToken() === this.TOKEN_X ? "X2" : "Y2");
                    }
                }
                else if (!validMovement || (this.getToken() === this.TOKEN_X ? !direcctionAllowedX : !direcctionAllowedY)) {
                    console.writeln(`Invalid movement`);
                }
            } while (!kingTokenMoved && (impossibleJump || !validMovement || (this.getToken() === this.TOKEN_X ? !direcctionAllowedX : !direcctionAllowedY)));
        },

        isMovement: function ({ row, column }) {
            return (row + column) % 2 === 1;
        },

        nextTurn: function () {
            this.turn = (this.turn + 1) % this.MAX_PLAYERS;
        },

        directionMovement: function (origin, target) {
            return target.column > origin.column ? true : false;
        },

        isDirecctionAllowedX: function (origin, target) {
            return (this.getToken() === this.TOKEN_X && target.row === origin.row - 1) ? true : false;
        },

        isDirecctionAllowedY: function (origin, target) {
            return (this.getToken() === this.TOKEN_Y && target.row - 1 === origin.row) ? true : false;
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