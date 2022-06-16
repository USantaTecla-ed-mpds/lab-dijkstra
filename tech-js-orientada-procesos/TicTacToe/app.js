const { Console } = require("console-mpds");
const console = new Console();

playTicTacToe();

function playTicTacToe() {
    do {
        const gameMode = askGameMode();
        playGame(gameMode);
    } while (isResumed());

    function askGameMode() {
        let error = false;
        let mode;
        do {
            let response = console.readNumber(`Dime el modo de juego:
        (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);

            switch (response) {
                case 0:
                    return [generateRandomPosition, generateRandomPosition];
                case 1:
                    return [askPosition, generateRandomPosition];
                case 2:
                    return [askPosition, askPosition];
            }
            console.writeln(`El modo de juego ${response} no existe`);
            error = true;
        } while (error);
        return mode;

        function generateRandomPosition() {
            position = parseInt(Math.random() * 3) + 1;
            return position;
        }

        function askPosition(title) {
            position = console.readNumber(`${title}: `);
            return position;
        }
    }

    function playGame(gameMode) {
        const MAX_PLAYERS = 2;
        const MAX_TOKENS = 3;
        const TOKEN_EMPTY = ` `;
        let tokens = [
            [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY],
            [TOKEN_EMPTY, TOKEN_EMPTY, TOKEN_EMPTY]
        ];
        let turn = 0;
        let winner;
        do {
            writelnTokens(tokens);
            placeToken(tokens, turn);
            winner = isTicTacToe(tokens, turn);
            if (!winner) {
                turn = nextTurn(turn);
            }
        } while (!winner);
        writelnTokens(tokens);
        console.writeln(`Victoria para ${getToken(turn)}`);

        function placeToken(tokens, turn) {
            console.writeln(`Turno para ${getToken(turn)}`);
            let error;
            let originRow;
            let originColumn;
            const movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS;
            if (movement) {
                do {
                    originRow = read(`Fila origen`, gameMode, turn);
                    originColumn = read(`Columna destino`, gameMode, turn);
                    error = !isOccupied(tokens, originRow, originColumn, turn);
                    if (error) {
                        console.writeln(`No hay una ficha de la propiedad de ${getToken(turn)}`);
                    }
                } while (error);
            }
            let targetRow;
            let targetColumn;
            do {
                targetRow = read(`Fila destino`, gameMode, turn);
                targetColumn = read(`Columna destino`, gameMode, turn);
                error = !isEmpty(tokens, targetRow, targetColumn);
                if (error) {
                    console.writeln(`Indique una celda vacía`);
                }
            } while (error);
            if (movement) {
                tokens[originRow][originColumn] = TOKEN_EMPTY;
            }
            tokens[targetRow][targetColumn] = getToken(turn);
        }

        function getNumTokens(tokens) {
            let empties = 0;
            for (let i = 0; i < tokens.length; i++) {
                for (let j = 0; j < tokens[i].length; j++) {
                    if (tokens[i][j] === TOKEN_EMPTY) {
                        empties++;
                    }
                }
            }
            return MAX_TOKENS ** 2 - empties;
        }

        function read(title, gameMode, turn) {
            let position;
            let error;
            do {
                if (turn % 2 === 0) {
                    position = gameMode[0](title);
                    error = position < 1 || 3 < position;
                } else {
                    position = gameMode[1](title);
                    error = position < 1 || 3 < position;
                }
                if (error) {
                    console.writeln(`Por favor un numero entre 1 y ${MAX_TOKENS} inclusives`)
                }
            } while (error);
            return position - 1;
        }

        function isEmpty(tokens, row, column) {
            return tokens[row][column] === TOKEN_EMPTY;
        }

        function getToken(turn) {
            const TOKEN_X = `X`;
            const TOKEN_Y = `Y`;
            return turn === 0 ? TOKEN_X : TOKEN_Y;
        }

        function writelnTokens(tokens) {
            const HORIZONTAL_SEPARTOR = `-------------`;
            const VERTICAL_SEPARATOR = `|`;
            let msg = ``;
            for (let i = 0; i < tokens.length; i++) {
                msg += `${HORIZONTAL_SEPARTOR}\n`;
                for (let j = 0; j < tokens[i].length; j++) {
                    msg += `${VERTICAL_SEPARATOR} ${tokens[i][j]} `;
                }
                msg += `${VERTICAL_SEPARATOR}\n`;
            }
            msg += HORIZONTAL_SEPARTOR;
            console.writeln(msg);
        }

        function nextTurn(turn) {
            return (turn + 1) % MAX_PLAYERS;
        }

        function isOccupied(tokens, row, column, turn) {
            return tokens[row][column] === getToken(turn);
        }

        function isTicTacToe(tokens, turn) {
            let countRows = [0, 0, 0];
            let countColumns = [0, 0, 0];
            let countDiagonal = 0;
            let countInverse = 0;
            for (let i = 0; i < tokens.length; i++) {
                for (let j = 0; j < tokens[i].length; j++) {
                    if (tokens[i][j] === getToken(turn)) {
                        countRows[i]++;
                        countColumns[j]++;
                        if (i - j === 0) {
                            countDiagonal++;
                        }
                        if (i + j === MAX_TOKENS - 1) {
                            countInverse++;
                        }
                    }
                }
            }
            if (countDiagonal === MAX_TOKENS || countInverse === MAX_TOKENS) {
                return true;
            }
            for (let i = 0; i < countRows.length; i++) {
                if (countRows[i] === MAX_TOKENS) {
                    return true;
                }
                if (countColumns[i] === MAX_TOKENS) {
                    return true;
                }
            }
            return false;
        }
    }
    function isResumed() {
        let result;
        let answer;
        let error = false;
        do {
            answer = console.readString(`¿Quieres jugar otra partida? "si" o "no" `);
            result = answer === `si`;
            error = !result && answer !== `no`;
            if (error) {
                console.writeln(`Por favor, responda "si" o "no"`);
            }
        } while (error);
        return result;
    }
}