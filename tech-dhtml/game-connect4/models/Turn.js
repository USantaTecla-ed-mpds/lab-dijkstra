import { assert } from '../utils/assert.js';
import { ClosedInterval } from './ClosedInterval.js'
import { Human } from './Human.js'
import { Random } from './Random.js'

export class Turn {

  static MAX_PLAYERS = 2;
  static #NUMBER_PLAYER = new ClosedInterval(0, Turn.MAX_PLAYERS);
  static #NUMBER_TURN = new ClosedInterval(0, 1);
  #currentTurn;
  #players;
  #board;

  constructor(board) {
    this.#board = board;
    this.#players = [];
  }

  reset(humanPlayers, currentTurn) {
    assert(Turn.isNumberPlayerValid(humanPlayers));
    assert(Turn.isNumberTurnValid(currentTurn));
    this.#players = [];
    for (let i = 0; i < Turn.MAX_PLAYERS; i++) {
      const player = (i < humanPlayers) ? new Human(i, this.#board) : new Random(i, this.#board);
      this.#players.push(player);
    }
    this.#currentTurn = currentTurn;
  }

  getCurrentPlayer() {
    return this.#players[this.#currentTurn];
  }

  getCurrentTurn() {
    return this.#currentTurn;
  }

  changeTurn() {
    if (!this.#board.isFinished()) {
      this.#currentTurn = (this.#currentTurn + 1) % Turn.MAX_PLAYERS;
    }
  }

  static isNumberPlayerValid(number) {
    return Turn.#NUMBER_PLAYER.isIncluded(number);
  }

  static isNumberTurnValid(number) {
    return Turn.#NUMBER_TURN.isIncluded(number);
  }
}