const { Console } = require("console-mpds");
const console = new Console();

let  initClosedInterval = function(min, max) {
  return {
    isIncluded(value) {
      return min <= value && value <= max;
    }
  }
}

let initCoordinate = function(row, column) {
  return {
    getRow() {
      return row;
    },
    getColumn() {
      return column;
    },
    getShifted(direction) {
      return initCoordinate(row + direction.getRow(), column + direction.getColumn());
    },
  }
}
initCoordinate.NUMBER_ROWS = 6;
initCoordinate.ROWS = initClosedInterval(0, initCoordinate.NUMBER_ROWS - 1);
initCoordinate.NUMBER_COLUMNS = 7;
initCoordinate.COLUMNS = initClosedInterval(0, initCoordinate.NUMBER_COLUMNS - 1);
initCoordinate.isColumnValid = function(column) {
  return initCoordinate.COLUMNS.isIncluded(column);
}
initCoordinate.isRowValid = function(row) {
  return initCoordinate.ROWS.isIncluded(row);
}

let initDirection = function(row, column) {
  return Object.create(
    initCoordinate(row, column), 
    {
      getOppocite: {
        value: function() {
          return initDirection(row * -1, column * -1);
        }
      }
    }
  );
}
initDirection.SOUTH = initDirection(-1, 0);
initDirection.WEST = initDirection(0, -1);
initDirection.SOUTH_WEST = initDirection(-1, -1);
initDirection.NORTH_WEST = initDirection(1, -1);
initDirection.VALUES = [initDirection.SOUTH,initDirection.WEST,initDirection.SOUTH_WEST,initDirection.NORTH_WEST];

let initLine = function(initialCoordinate, direction) {
  let coordinates = [initialCoordinate];
  for (let i = 0; i < initLine.LENGTH - 1; i++) {
    coordinates.push(coordinates[i].getShifted(direction));
  }

  return {
    get(ordinal) {
      return coordinates[ordinal];
    },
    displaceOne(direction) {
      coordinates = coordinates.map(coordinate => coordinate.getShifted(direction));
      return this;
    }
  }
}
initLine.LENGTH = 4;

let initTurn = function() {
  let currentTurn = 0;
  const COLORS = ["R", "Y"];

  return {
    getCurrentColor() {
      return COLORS[currentTurn];
    },
    changeTurn() {
      currentTurn = (currentTurn + 1) %  initTurn.NUMBER_PLAYERS;
    }
  }
}
initTurn.NUMBER_PLAYERS = 2;

let initBoard = function() {
  let cells = Array.from(Array(initCoordinate.NUMBER_ROWS), () => Array(initCoordinate.NUMBER_COLUMNS));
  const EMPTY_CELL = undefined;
  let currentCoordinate;
  
  function calculateRow(column) {
    for (let row = 0; row < cells.length; row++) {
      if (cells[row][column] === EMPTY_CELL) {
        return row;
      }
    }
  }

  function isConnect4(line) {
    const COLOR = getColor(line.get(0));
    for (let i = 1; i < initLine.LENGTH; i++) {
      if (getColor(line.get(i)) !== COLOR) {
        return false;
      }
    }
    return true;
  }
  
  function getColor(coordinate) {
    if (initCoordinate.isRowValid(coordinate.getRow())) {
      return cells[coordinate.getRow()][coordinate.getColumn()];;
    }
  }

  return {
    getColor,
    addColor(column, color) {
      const row = calculateRow(column);
      cells[row][column] = color;
      currentCoordinate = initCoordinate(row, column);
    },
    isComplete(column) {
      if (column !== undefined) {
        return cells[initCoordinate.NUMBER_ROWS - 1][column] !== EMPTY_CELL;
      }
      for (let i = 0; i < initCoordinate.NUMBER_COLUMNS; i++) {
          if (!this.isComplete(i)) {
              return false;
          }
      }
      return true;
    },
    isWinner() {
      const DIRECTIONS = initDirection.VALUES;
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        let line = initLine(currentCoordinate, DIRECTIONS[i]);
        isWinner = isConnect4(line);
          for (let j = 0; !isWinner && j < initLine.LENGTH - 1; j++) {
            line = line.displaceOne(DIRECTIONS[i].getOppocite());
            isWinner = isConnect4(line);
          } 
            
      }
      return isWinner;
    }
  }
}

let initGame = function() {
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
    addColor(column) {
      board.addColor(column, turn.getCurrentColor());
    },
    isComplete(column) {
      return board.isComplete(column);
    },
    isWinner() {
      return board.isWinner();
    },
    isFinished() {
      return board.isWinner() || board.isComplete();
    }
  }
}

let initPlayerView = function(game) {
  return {
    putColor() {
      let column;
      let valid;
      do {
        console.writeln(`--------------------------`);
        column = console.readNumber(`Player ${game.getCurrentColor()} Select column between (1 - 7)`) - 1;
        valid = initCoordinate.isColumnValid(column);
        if (!valid) {
          console.writeln(`Remember columns between 1 and 7`);
        } else {
          valid = !game.isComplete(column)
          if (!valid) {
            console.writeln(`This column is full`);
          }
        }
      } while (!valid);
      game.addColor(column);
    }
  }
}

let initBoardView = function(board) {
  return {
    show() {
      console.writeln(`* 1 2 3 4 5 6 7`);
      for (let row = initCoordinate.NUMBER_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
        for (let column = 0; column < initCoordinate.NUMBER_COLUMNS; column++) {
          console.write(`${board.getColor(initCoordinate(row, column)) || "_"},`);
        }
        console.writeln();
      }
    }
  }
}

let initGameView = function(game) {
  let playerView = initPlayerView(game);
  let boardView = initBoardView(game.getBoard());

  function showResult() {
    console.writeln(game.isWinner() ? `The winner is the player ${game.getCurrentColor()}` : `Tied Game`);
  }

  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.show();
      let gameFinished;
      do {
        playerView.putColor();
        boardView.show();
        gameFinished = game.isFinished();
        if (!gameFinished) {
          game.changeTurn();
        }
      } while (!gameFinished);
        showResult();
    }
  }
}

let initYesNoDialogView = function(question) {
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

let initConnect4View = function() {
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

initConnect4View().play();

exports.initGame = initGame;
