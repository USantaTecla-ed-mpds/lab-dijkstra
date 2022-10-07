const { Console } = require("console-mpds");
const console = new Console();

initCoordinate.MAX_ROWS = 6;
initCoordinate.MIN_COLUMS = 1;
initCoordinate.MAX_COLUMNS = 7;

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
  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.showBoard();
      let gameFinished;
      do {
        playerView.putColor();
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        boardView.showBoard();
      } while (!gameFinished);
      console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getCurrentColor()}`);
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
          console.writeln("Remember columns between 1 and 7");
          col = null;
        } else if (game.isFullColumn(col - 1)) {
          console.writeln("This column is full");
          col = null;
        }
      } while (!col);
      col--;
      game.addColor(initCoordinate(col, game.calculateRow(col)));
    }
  }
}

function initBoardView(board) {
  return {
    showBoard() {
      console.writeln(`* 1 2 3 4 5 6 7`);
      for (let row = initCoordinate.MAX_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
        for (let col = 0; col < initCoordinate.MAX_COLUMNS; col++) {
          console.write(`${board.getCell(initCoordinate(col, row)) || "_"},`);
        }
        console.writeln();
      }
    }
  }
}

function initGame() {
  let turn = initTurn();
  let board = initBoard();
  let currentCoordinate;

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
    addColor(coordinate) {
      currentCoordinate = coordinate;
      board.addColor(coordinate, turn.getCurrentColor());
    },
    isFullColumn(col) {
      return board.isFullColumn(col);
    },
    calculateRow(col) {
      return board.calculateRow(col);
    },
    isWinner() {
      return board.isWinner(currentCoordinate);
    },
    isTied() {
      return turn.isFinished();
    }
  }
}

function initBoard() {
  let cells = Array.from(Array(initCoordinate.MAX_ROWS), () => Array(initCoordinate.MAX_COLUMNS));
  const EMPTY_CELL = undefined;
  const TOKENS_CONNECTED_FOR_WIN = 4;

  function getCell(coordinate) {
    if (0 > coordinate.row || coordinate.row >= initCoordinate.MAX_ROWS) {
      return undefined;
    }
    return cells[coordinate.row][coordinate.col];
  }
  
  function isConnect4(direction) {
    const COLOR = getCell(direction[0]);
    for (let i = 1; i < TOKENS_CONNECTED_FOR_WIN; i++) {
      if (getCell(direction[i]) !== COLOR) {
        return false;
      }
    }
    return true;
  }

  return {
    getCell,
    isFullColumn(col) {
      return cells[initCoordinate.MAX_ROWS - 1][col] !== EMPTY_CELL;
    },
    calculateRow(col) {
      for (let row = 0; row < cells.length; row++) {
        if (cells[row][col] === EMPTY_CELL) {
          return row;
        }
      }
    },
    addColor(coordinate, color) {
      console.writeln(JSON.stringify(coordinate));
      cells[coordinate.row][coordinate.col] = color;
    },
    isWinner(currentCoordinate) {
      const SOUTH = initLine(currentCoordinate, initCoordinate(0, -1));
      const WEST = initLine(currentCoordinate, initCoordinate(-1, 0));
      const SOUTH_WEST = initLine(currentCoordinate, initCoordinate(-1, -1));
      const NORTH_WEST = initLine(currentCoordinate, initCoordinate(1, -1));
      const DIRECTIONS = [SOUTH, WEST, SOUTH_WEST, NORTH_WEST];
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        isWinner = isConnect4(DIRECTIONS[i].getLine())
          || isConnect4(DIRECTIONS[i].getOppocite());;
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

function initLine(initial, coordinateShift) {
    
  const LENGTH = 4;
  let coordenates = getCoordenates(initial, coordinateShift);
  let oppocite = getCoordenates(initial, initCoordinate(coordinateShift.col * -1, coordinateShift.row * -1));

  function getCoordenates(initial, coordinateShift) {
    let coordenates = [initCoordinate(initial.col, initial.row)];
    for (let i = 0; i < LENGTH - 1; i++) {
      coordenates.push(coordenates[i].shift(coordinateShift));
    }
    return coordenates;
  }

  return {
    getLine() {
      return coordenates;
    },
    getOppocite() {
      return oppocite;
    }
  }
}

function initCoordinate(col, row) {

  return {
    col,
    row,
    shift(coordinate) {
      return initCoordinate(this.col + coordinate.col, this.row + coordinate.row);
    }
  }
}
