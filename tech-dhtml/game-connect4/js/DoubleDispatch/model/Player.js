import { Color } from './Color.js'
import { Coordinate } from "./Coordinate.js";

class Player {

  #color;
  #board;

  constructor(color, board) {
    this.#color = color;
    this.#board = board;
  }

  getColor() {
    return this.#color.toString();
  }

  isComplete(column) {
      return this.#board.isComplete(column);
  }

  dropToken(column) {
    this.#board.dropToken(column, this.#color.toString().charAt());
  }
}

export class Human extends Player {

  constructor(playerNumber, board) {
    super(Color.get(playerNumber), board);
  }

  dropToken(column) {
    if (!Coordinate.isColumnValid(column)) 
      return `Remember columns between 1 and ${Coordinate.MAX_COLUMNS}`;
    if (this.isComplete(column)) 
      return `This column is full`;
    super.dropToken(column);
  }

  accept(turnView) {
    return turnView.visitHuman(this)
  }
}

export class Random extends Player {

  constructor(playerNumber, board) {
    super(Color.get(playerNumber), board);
  }

  dropToken() {
    let column;
    do {
      column = parseInt(Math.random() * Coordinate.MAX_COLUMNS);
    } while (this.isComplete(column));
    super.dropToken(column);
  }

  accept(turnView) {
    return turnView.visitRandom(this)
  }
}