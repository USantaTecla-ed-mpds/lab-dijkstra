import { Color } from './Color.js'
import { Coordinate } from './Coordinate.js';
import { Player } from './Player.js';

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

  accept(turnView, column) {
    return turnView.visitHuman(this, column)
  }
}