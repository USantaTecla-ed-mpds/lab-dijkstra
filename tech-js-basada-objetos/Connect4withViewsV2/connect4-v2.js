const { Console } = require("console-mpds");
const console = new Console();

initConnect4View().play();

function initConnect4View() {
  return {
    play() {
      const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
      do {
        const gameMode = initGameMode().ask();
        initGameView(gameMode).play();
        continueDialogView.read();
      } while (continueDialogView.isAffirmative());
    }
  }
}

function initGameMode() {
  return {
    ask() {
      const gameModes = [[initCPU(), initCPU()],[initPlayerView(), initCPU()],[initPlayerView(), initPlayerView()]];
      let error = false;
      do {
        let response = console.readNumber(`Tell me the game mode:
                  (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);
        if (response === 0 || response === 1 || response === 2) {
          return gameModes[response];
        } else {
          console.writeln(`This game mode ${response} doesn´t exist`);
          error = true;
        }
      } while (error);
    }
  }
}

function initCPU() {
  return {
    readToken(game) {
      let token = {player: game.getPlayer()};
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        token.col = parseInt(Math.random() * 7) + 1;
        token.row = game.calculateRow(token.col);
        if (1 > token.col || token.col > 7) {
          correctColumn = false;
        } else if (token.row === undefined) {
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken(token);
    }
  }
}

function initPlayerView() {
  return {
    readToken(game) {
      let token = {player: game.getPlayer()};
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        token.col = console.readNumber(`Player ${game.getPlayer()} Select column between (1 - 7)`);
        token.row = game.calculateRow(token.col);
        if (1 > token.col || token.col > 7) {
          console.writeln("Remember columns between 1 and 7");
          correctColumn = false;
        } else if (token.row === undefined) {
          console.writeln("This column is full");
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken(token);
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

function initGameView(players) {
  let game = initGame();
  let boardView = initBoardView(game.getBoard());
  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.showBoard();
      let gameFinished;
      do {
        players[game.getTurn()].readToken(game);
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        boardView.showBoard();
      } while (!gameFinished);
      this.showFinalMsg();
    },
    showFinalMsg() {
      game.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${game.getPlayer()}`);
    }
  }
}

function initBoardView(board) {
  return {
    showBoard() {
      console.writeln(board.getRow(0));
      for (let row = board.MAX_ROWS; row > 0; row--) {
        console.writeln(board.getRow(row));
      }
    }
  }
}

function initGame() {
  let turn = initTurn();
  let board = initBoard();
  let checker = initChecker();

  return {
    getBoard() {
      return board;
    },
    getTurn() {
      return turn.getTurn();
    },
    getPlayer() {
      return turn.getPlayer();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addToken(token) {
      checker.setCurrentToken(token);
      board.addToken(token);
    },
    calculateRow(col) {
      return board.calculateRow(col);
    },
    isWinner() {
      return checker.isConnectedInHorizontal(board)
        || checker.isConnectedInVertical(board)
        || checker.isConnectedInDiagonalPrincipal(board)
        || checker.isConnectedInDiagonalSecond(board);
    },
    isTied() {
      return turn.getTurns() === turn.MAX_TURNS - 1;
    }
  }
}

function initBoard() {
  const MIN_ROWS = 1;
  const MIN_COLUMNS = 1;
  const MAX_ROWS = 6;
  const MAX_COLUMNS = 7;
  let grid = [["*", "1", "2", "3", "4", "5", "6", "7"],
              ["1", "_", "_", "_", "_", "_", "_", "_"],
              ["2", "_", "_", "_", "_", "_", "_", "_"],
              ["3", "_", "_", "_", "_", "_", "_", "_"],
              ["4", "_", "_", "_", "_", "_", "_", "_"],
              ["5", "_", "_", "_", "_", "_", "_", "_"],
              ["6", "_", "_", "_", "_", "_", "_", "_"]];

  return {
    MAX_ROWS,
    getCell(coordinate) {
      return coordinate.y <= MAX_ROWS ? grid[coordinate.y][coordinate.x] : undefined;
    },
    getRow(number) {
      return grid[number];
    },
    calculateRow(col) {
      for (let row = 1; row < grid.length - 1; row++) {
        if (grid[row][col] === "_") {
          return row;
        }
      }
    },
    addToken(token) {
      grid[token.row][token.col] = token.player;
    }
  }
}

function initTurn() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const PLAYER_1 = "X";
  const PLAYER_2 = "O";

  return {
    MAX_TURNS,
    getPlayer() {
      return numberOfTurns % 2 === 0 ? PLAYER_1 : PLAYER_2;
    },
    getTurns() {
      return numberOfTurns;
    },
    getTurn() {
      return numberOfTurns % 2 === 0 ? 0 : 1;
    },
    changeTurn() {
      numberOfTurns++;
    }
  }
}

function initChecker() {

  let currentToken;
  const TOKENS_CONNECTED_FOR_WIN = 4;
  
  function isConnect4(direction, board) {
    for (let i = 1; i < TOKENS_CONNECTED_FOR_WIN; i++) {
      if (board.getCell(direction[i]) !== currentToken.player) {
        return false;
      }
    }
    return true;
  }

  return {
    setCurrentToken(token) {
      currentToken = token;
    },
    isConnectedInVertical(board) {
      let vertical = initDirection(`DOWN`, currentToken);
      return isConnect4(vertical.getDirection(), board);
    },
    isConnectedInHorizontal(board) {
      let horizontal = initDirection(`RIGHT`, currentToken);
      return isConnect4(horizontal.getDirection(), board) 
        || isConnect4(horizontal.getOppocite(), board);
    },
    isConnectedInDiagonalPrincipal(board) {
      let diagonalPrincial = initDirection(`DIAGONAL_PRINCIPAL`, currentToken);
      return isConnect4(diagonalPrincial.getDirection(), board) 
        || isConnect4(diagonalPrincial.getOppocite(), board);
    },
    isConnectedInDiagonalSecond(board) {
      let diagonalSecond = initDirection(`DIAGONAL_SECOND`, currentToken);
      return isConnect4(diagonalSecond.getDirection(), board) 
        || isConnect4(diagonalSecond.getOppocite(), board);
    }
  }
}

function initDirection(type, token) {

  const LENGTH = 4;
  let direction = geCoordinates();

  function geCoordinates(isOpposite) {
    let coordinates = [initCoordinate(token.col, token.row)];
    for (let i = 0; i < LENGTH; i++) {
      if (type === `DOWN`) {
        coordinates.push(coordinates[i].getSouth());
      } else if (type === `RIGHT` && isOpposite) {
        coordinates.push(coordinates[i].getWest());
      } else if (type === `RIGHT`) {
        coordinates.push(coordinates[i].getEast());
      } else if (type === `DIAGONAL_PRINCIPAL` && isOpposite) {
        coordinates.push(coordinates[i].getSouthWest());
      } else if (type === `DIAGONAL_PRINCIPAL`) {
        coordinates.push(coordinates[i].getNorthEast());
      } else if (type === `DIAGONAL_SECOND` && isOpposite) {
        coordinates.push(coordinates[i].getNorthWest());
      } else if (type === `DIAGONAL_SECOND`) {
        coordinates.push(coordinates[i].getSouthEast());
      }
    }
    return coordinates;
  }

  return {
    getDirection() {
      return direction;
    },
    getOppocite() {
      return geCoordinates(true);
    }
  }
}

function initCoordinate(x, y) {

  return {
    x,
    y,
    getNorth() {
      return new initCoordinate(x, y + 1);
    },
    getSouth() {
      return new initCoordinate(x, y - 1);
    },
    getEast() {
      return new initCoordinate(x + 1, y);
    },
    getWest() {
      return new initCoordinate(x - 1, y);
    },
    getNorthEast() {
      return new initCoordinate(x + 1, y + 1);
    },
    getSouthEast() {
      return new initCoordinate(x + 1, y - 1);
    },
    getSouthWest() {
      return new initCoordinate(x - 1, y - 1);
    },
    getNorthWest() {
      return new initCoordinate(x - 1, y + 1);
    }
  }
}
