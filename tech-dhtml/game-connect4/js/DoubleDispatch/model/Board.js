import { assert } from '../utils/assert.js';
import { Color } from './Color.js';
import { Coordinate } from './Coordinate.js'
import { Direction } from './Direction.js'

export class Board {

  static LINE_LENGTH = 4;
  #EMPTY_CELL = null;
  #colors;
  #currentCoordinate;

  constructor() {}

  reset(colors) {
    if (colors !== null) {
      assert(Coordinate.NUMBER_ROWS.isIncluded(colors.length - 1));
      assert(Coordinate.NUMBER_COLUMNS.isIncluded(colors[0].length - 1));
      this.#colors = colors;
    } else {
      this.#colors = this.#inicialBoard();
    }
    this.#currentCoordinate = null;
  }


  #inicialBoard() {
    return Array.from(Array(Coordinate.MAX_ROWS), () => 
      Array.from(Array(Coordinate.MAX_COLUMNS), () => 
        this.#EMPTY_CELL
      ));
  }

  getCurrentCoordinate() {
    return this.#currentCoordinate;
  }

  getColor(coordinate) {
    assert(coordinate.isValid());
    return this.#colors[coordinate.row][coordinate.column];
  }

  getColors() {
    return this.#colors;
  }

  dropToken(column, color) {
    assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
    assert(Color.isColorValid(color));
    const row = this.#calculateRow(column);
    this.#colors[row][column] = color;
    this.#currentCoordinate = new Coordinate(row, column);
  }

  isComplete(column) {
    if (column !== undefined) {
      assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
      return this.#colors[Coordinate.MAX_ROWS - 1][column] !== this.#EMPTY_CELL;
    }
    for (let i = 0; i < Coordinate.MAX_COLUMNS; i++) {
      if (!this.isComplete(i)) {
        return false;
      }
    }
    return true;
  }

  isWinner() {
    if (this.#currentCoordinate === null) {
      return false;
    }
    for (let direction of Direction.values()) {
      let line = this.#getLine(this.#currentCoordinate, direction);
      for (let i = 0; i < Board.LINE_LENGTH; i++) {
        if (this.#isConnect4(line)) {
          return true;
        };
        line = line.map(coordinate => coordinate.getShifted(direction.getOpposite().getCoordinate()));
      }
    }
    return false;
  }

  isFinished() {
    return this.isComplete() || this.isWinner();
}

  #calculateRow(column) {
    assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
    for (let row = 0; row < this.#colors.length; row++) {
      if (this.#colors[row][column] === this.#EMPTY_CELL) {
        return row;
      }
    }
  }

  #getLine(initialCoordinate, direction) {
    assert(initialCoordinate.isValid());
    let coordinates = [initialCoordinate];
    for (let i = 0; i < Board.LINE_LENGTH - 1; i++) {
      coordinates.push(coordinates[i].getShifted(direction.getCoordinate()));
    }
    return coordinates;
  }

  #isConnect4(line) {
    assert(line.length === Board.LINE_LENGTH)
    for (let i = 0; i < Board.LINE_LENGTH; i++) {
      if (!line[i].isValid()) {
        return false;
      }
      if (i > 0 && this.getColor(line[i - 1]) !== this.getColor(line[i])) {
        return false;
      }
    }
    return true;
  }
}