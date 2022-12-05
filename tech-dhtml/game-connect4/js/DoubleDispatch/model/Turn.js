import { ClosedInterval } from './ClosedInterval.js'
import { Human, Random } from './Player.js'

export class Turn {

  static MAX_PLAYERS = 2;
  static NUMBER_PLAYER = new ClosedInterval(0, Turn.MAX_PLAYERS);
  #currentTurn = 0;
  #players = [];
  #board;

  constructor(humanPlayers, board) {
    for (let i = 0; i < Turn.MAX_PLAYERS; i++) {
      const player = (i < humanPlayers) ? new Human(i, board) : new Random(i, board);
      this.#players.push(player);
      this.#board = board;
    }
  }

  getCurrentPlayer() {
    return this.#players[this.#currentTurn];
  }

  next() {
    if (!this.#board.isFinished()) {
      this.#currentTurn = (this.#currentTurn + 1) % Turn.MAX_PLAYERS;
    }
  }

  static isNumberPlayerValid(number) {
    return Turn.NUMBER_PLAYER.isIncluded(number);
  }
}