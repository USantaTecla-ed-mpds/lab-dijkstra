import { assert } from '../utils/assert.js';
import { Coordinate } from './Coordinate.js';

export class Player {

  #color;
  #board;

  constructor(color, board) {
    this.#color = color;
    this.#board = board;
  }

  getColor() {
    return this.#color;
  }

  isComplete(column) {
      assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
      return this.#board.isComplete(column);
  }

  dropToken(column) {
    assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
    this.#board.dropToken(column, this.#color.toString());
  }
}