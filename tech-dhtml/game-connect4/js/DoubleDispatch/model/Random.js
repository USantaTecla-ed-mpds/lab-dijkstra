import { assert } from '../utils/assert.js';
import { Color } from './Color.js'
import { Coordinate } from './Coordinate.js';
import { Player } from './Player.js';

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