import { assert } from '../utils/assert.js'
import { Board } from './Board.js'
import { Turn } from './Turn.js'
import { Coordinate } from './Coordinate.js'

export class Game {

  #board;
  #turn;

  constructor() {
    this.#board = new Board();
    this.#turn = new Turn(this.#board);
  }

  reset(humanPlayers, colors, currentTurn) {
    assert(Turn.isNumberPlayerValid(humanPlayers));
    assert(Coordinate.NUMBER_ROWS.isIncluded(colors.length - 1));
    assert(Coordinate.NUMBER_COLUMNS.isIncluded(colors[0].length - 1));
    assert(Turn.isNumberTurnValid(currentTurn));
    this.#board.reset(colors);
    this.#turn.reset(humanPlayers, currentTurn);
  }

  getBoard() {
    return this.#board;
  }

  getTurn() {
    return this.#turn;
  }

  getCurrentPlayer() {
    return this.#turn.getCurrentPlayer();
  }

  getCurrentCoordinate() {
    return this.#board.getCurrentCoordinate();
  }

  isWinner() {
    return this.#board.isWinner();
  }

  isFinished() {
    return this.#board.isWinner() || this.#board.isComplete();
  }
}