import { assert } from '../utils/assert.js'
import { Board } from './Board.js'
import { Turn } from './Turn.js'

export class Game {

  #board;
  #turn;

  constructor() {
    this.#board = new Board();
    this.#turn = new Turn(this.#board);
  }

  reset(humanPlayers, colors, currentTurn) {
    assert(Turn.isNumberPlayerValid(humanPlayers));
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

  getCurrentTurn() {
    return this.#turn.getCurrentTurn();
  }

  isWinner() {
    return this.#board.isWinner();
  }

  isFinished() {
    return this.#board.isWinner() || this.#board.isComplete();
  }
}