import { Coordinate } from './Coordinate.js'

export class Direction {

  static SOUTH = new Direction(-1, 0);
  static WEST = new Direction(0, -1);
  static SOUTH_WEST = new Direction(-1, -1);
  static NORTH_WEST = new Direction(1, -1);
  #coordinate;

  constructor(row, column) {
      this.#coordinate = new Coordinate(row, column);
  }

  getCoordinate() {
    return this.#coordinate;
  }

  getOpposite() {
    return new Direction(this.#coordinate.row * -1, this.#coordinate.column * -1);
  }

  static values() {
    return [Direction.SOUTH, Direction.WEST, Direction.SOUTH_WEST, Direction.NORTH_WEST];
  }
}