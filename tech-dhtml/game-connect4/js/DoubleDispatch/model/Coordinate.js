import { ClosedInterval } from './ClosedInterval.js'

export class Coordinate {

  static MAX_ROWS = 6;
  static NUMBER_ROWS = new ClosedInterval(0, Coordinate.MAX_ROWS - 1);
  static MAX_COLUMNS = 7;
  static NUMBER_COLUMNS = new ClosedInterval(0, Coordinate.MAX_COLUMNS - 1);
  #row;
  #column;

  constructor(row, column) {
    this.#row = row;
    this.#column = column;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  getShifted(coordinate) {
    return new Coordinate(this.#row + coordinate.row, this.#column + coordinate.column);
  }

  static isRowValid(row) {
    return Coordinate.NUMBER_ROWS.isIncluded(row);
  }
  
  static isColumnValid(column) {
    return Coordinate.NUMBER_COLUMNS.isIncluded(column);
  }
}