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
  let playerView = initPlayerView(game);
  let boardView = initBoardView(game.getBoard());
  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.showBoard();
      let gameFinished;
      do {
        playerView.putToken();
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        boardView.showBoard();
      } while (!gameFinished);
      console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getPlayer()}`);
    }
  }
}

function initPlayerView(game) {
  return {
    putToken() {
      let col, row;
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        col = console.readNumber(`Player ${game.getPlayer()} Select column between (1 - 7)`);
        row = game.calculateRow(col - 1);
        if (1 > col || col > 7) {
          console.writeln("Remember columns between 1 and 7");
          correctColumn = false;
        } else if (row === undefined) {
          console.writeln("This column is full");
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken({x: col - 1, y: row});
    }
  }
}

function initBoardView(board) {
  return {
    showBoard() {
      console.writeln(`* 1 2 3 4 5 6 7`);;
      for (let row = board.MAX_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
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
    getPlayer() {
      return turn.getPlayer();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addToken(coordinate) {
      checker.setCurrentCoordinate(coordinate);
      board.addToken(coordinate, turn.getPlayer());
    },
    calculateRow(col) {
      return board.calculateRow(col);
    },
    isWinner() {
      return checker.isWinner(board);
    },
    isTied() {
      return turn.isFinished();
    }
  }
}

function initBoard() {
  const MIN_ROWS = 1;
  const MIN_COLUMNS = 1;
  const MAX_ROWS = 6;
  const MAX_COLUMNS = 7;
  let grid = [["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"]];

  return {
    MAX_ROWS,
    getCell(coordinate) {
      if (0 > coordinate.y || coordinate.y >= MAX_ROWS) {
        return undefined;
      }
      return grid[coordinate.y][coordinate.x];
    },
    getRow(number) {
      return grid[number];
    },
    calculateRow(col) {
      for (let row = 0; row < grid.length - 1; row++) {
        if (grid[row][col] === "_") {
          return row;
        }
      }
    },
    addToken(coordinate, player) {
      grid[coordinate.y][coordinate.x] = player;
    }
  }
}

function initTurn() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const PLAYERS = ["X", "O"];

  function getTurn() {
    return numberOfTurns % 2;
  }

  return {
    getPlayer() {
      return getTurn() === 0 ? PLAYERS[0] : PLAYERS[1];
    },
    changeTurn() {
      numberOfTurns++;
    },
    isFinished() {
      return numberOfTurns === MAX_TURNS - 1;
    }
  }
}

function initChecker() {

  let currentCoordinate;
  const TOKENS_CONNECTED_FOR_WIN = 4;
  
  function isConnect4(direction, board) {
    const TOKEN = board.getCell(direction[0]);
    for (let i = 1; i < TOKENS_CONNECTED_FOR_WIN; i++) {
      if (board.getCell(direction[i]) !== TOKEN) {
        return false;
      }
    }
    return true;
  }

  return {
    setCurrentCoordinate(coordinate) {
      currentCoordinate = coordinate;
    },
    isWinner(board) {
      const SOUTH = initCoordinate(0, -1);
      const WEST = initCoordinate(-1, 0);
      const SOUTH_WEST = initCoordinate(-1, -1);
      const NORTH_WEST = initCoordinate(1, -1);
      const DIRECTIONS = [SOUTH, WEST, SOUTH_WEST, NORTH_WEST];
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        let direction = initDirection(currentCoordinate, DIRECTIONS[i]);
        isWinner = isConnect4(direction.getDirection(), board)
          || isConnect4(direction.getOppocite(DIRECTIONS[i]), board);;
      }
      return isWinner;
    }
  }
}

function initDirection(initial, coordinateShift) {
    
  const LENGTH = 4;
  let coordenates = [initCoordinate(initial.x, initial.y)];
  for (let i = 0; i < LENGTH - 1; i++) {
    coordenates.push(coordenates[i].shift(coordinateShift));
  }

  return {
    getDirection() {
      return coordenates;
    },
    getOppocite(coordinateShift) {
      const OPPOCITE = {x: coordinateShift.x * -1, y: coordinateShift.y * -1};
      let direction = [coordenates[0]];
      for (let i = 0; i < LENGTH - 1; i++) {
        direction.push(direction[i].shift(OPPOCITE));
      }
      return direction;
    }
  }
}

function initCoordinate(x, y) {

  return {
    x,
    y,
    shift(coordinate) {
      return initCoordinate(this.x + coordinate.x, this.y + coordinate.y);
    }
  }
}
