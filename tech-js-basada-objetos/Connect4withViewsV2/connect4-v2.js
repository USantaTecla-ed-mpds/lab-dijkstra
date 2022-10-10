const { Console } = require("console-mpds");
const console = new Console();

initCoordinate.MAX_ROWS = 6;
initCoordinate.MIN_COLUMS = 1;
initCoordinate.MAX_COLUMNS = 7;

initGame.TOKENS_CONNECTED_FOR_WIN = 4;

initConnect4View().play();

function initConnect4View() {
  return {
    play() {
      const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
      do {
        let game = initGame();
        initGameView(game).play();
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

function initGameView(game) {
  let playerView = initPlayerView(game);
  let boardView = initBoardView(game.getBoard());

  function showResult() {
    console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getCurrentColor()}`);
  }

  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.show();
      let gameFinished;
      do {
        playerView.putColor();
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        boardView.show();
      } while (!gameFinished);
        showResult();
    }
  }
}

function initPlayerView(game) {
  return {
    putColor() {
      let col;
      do {
        console.writeln(`--------------------------`);
        col = console.readNumber(`Player ${game.getCurrentColor()} Select column between (1 - 7)`);
        if (col < initCoordinate.MIN_COLUMS || initCoordinate.MAX_COLUMNS < col) {
          console.writeln(`Remember columns between 1 and 7`);
          col = null;
        } else if (game.isFullColumn(col - 1)) {
          console.writeln(`This column is full`);
          col = null;
        }
      } while (!col);
      game.addColor(col - 1);
    }
  }
}

function initBoardView(board) {
  return {
    show() {
      console.writeln(`* 1 2 3 4 5 6 7`);
      for (let row = initCoordinate.MAX_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
        for (let col = 0; col < initCoordinate.MAX_COLUMNS; col++) {
          console.write(`${board.getColor(initCoordinate(col, row)) || "_"},`);
        }
        console.writeln();
      }
    }
  }
}

function initGame() {
  let turn = initTurn();
  let board = initBoard();

  return {
    getBoard() {
      return board;
    },
    getCurrentColor() {
      return turn.getCurrentColor();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addColor(col) {
      board.addColor(col, turn.getCurrentColor());
    },
    isFullColumn(col) {
      return board.isFullColumn(col);
    },
    isWinner() {
      return board.isWinner();
    },
    isTied() {
      return turn.isFinished();
    }
  }
}

function initBoard() {
  let cells = Array.from(Array(initCoordinate.MAX_ROWS), () => Array(initCoordinate.MAX_COLUMNS));
  const EMPTY_CELL = undefined;
  let currentCoordinate;
  
  function calculateRow(col) {
    for (let row = 0; row < cells.length; row++) {
      if (cells[row][col] === EMPTY_CELL) {
        return row;
      }
    }
  }

  function isConnect4(coordinates) {
    const COLOR = getColor(coordinates[0]);
    for (let i = 1; i < initGame.TOKENS_CONNECTED_FOR_WIN; i++) {
      if (getColor(coordinates[i]) !== COLOR) {
        return false;
      }
    }
    return true;
  }
  
  function getColor(coordinate) {
    if (0 > coordinate.row || coordinate.row >= initCoordinate.MAX_ROWS) {
      return undefined;
    }
    return cells[coordinate.row][coordinate.col];
  }

  return {
    getColor,
    isFullColumn(col) {
      return cells[initCoordinate.MAX_ROWS - 1][col] !== EMPTY_CELL;
    },
    addColor(col, color) {
      const row = calculateRow(col);
      cells[row][col] = color;
      currentCoordinate = initCoordinate(col, row);
    },
    isWinner() {
      const SOUTH = initCoordinate(0, -1);
      const WEST = initCoordinate(-1, 0);
      const SOUTH_WEST = initCoordinate(-1, -1);
      const NORTH_WEST = initCoordinate(1, -1);
      const DIRECTIONS = [SOUTH, WEST, SOUTH_WEST, NORTH_WEST];
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        let line = initLine(currentCoordinate, DIRECTIONS[i]);
        isWinner = isConnect4(line.getCoordinates());
          for (let j = 0; !isWinner && j < initGame.TOKENS_CONNECTED_FOR_WIN - 1; j++) {
            line = line.displaceOne(DIRECTIONS[i].getOppocite());
            isWinner = isConnect4(line.getCoordinates());;
          } 
            
      }
      return isWinner;
    }
  }
}

function initTurn() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const COLORS = ["R", "Y"];

  function getTurn() {
    return numberOfTurns % 2;
  }

  return {
    getCurrentColor() {
      return COLORS[getTurn()];
    },
    changeTurn() {
      numberOfTurns++;
    },
    isFinished() {
      return numberOfTurns === MAX_TURNS - 1;
    }
  }
}

function initLine(initialCoordinate, coordinateShift) {

  let coordinates = [initialCoordinate];
  for (let i = 0; i < initGame.TOKENS_CONNECTED_FOR_WIN - 1; i++) {
    coordinates.push(coordinates[i].shift(coordinateShift));
  }

  return {
    getCoordinates() {
      return coordinates;
    },
    displaceOne(coordinateShift) {
      coordinates = coordinates.map(coordinate => coordinate.shift(coordinateShift));
      return this;
    }
  }
}

function initCoordinate(col, row) {

  return {
    col,
    row,
    shift(coordinate) {
      return initCoordinate(this.col + coordinate.col, this.row + coordinate.row);
    },
    getOppocite() {
      return initCoordinate(this.col * -1, this.row * -1);
    }
  }
}

exports.initGame = initGame;
