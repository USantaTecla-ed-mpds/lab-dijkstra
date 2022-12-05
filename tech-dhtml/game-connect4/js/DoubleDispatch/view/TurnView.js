import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";

export class TurnView {

    #turn;
    #boardView;

    constructor(turn, board) {
      this.#turn = turn;
      this.#boardView = board;
      this.#updateTurn();
    }

    play() {
        return this.#turn.getCurrentPlayer().accept(this);
    }

    visitRandom(randow) {
        randow.dropToken();
        const color = this.#turn.getCurrentPlayer().getColor();
        this.#boardView.writeToken(color);
        this.#removeTurn()
        this.#turn.next();
        this.#updateTurn();
    }

    visitHuman(human) {
        return 'manualOperation';
      }

    dropToken(column) {
        assert(Coordinate.isColumnValid(column));
        const currentPlayer = this.#turn.getCurrentPlayer();
        currentPlayer.dropToken(column);
        this.#boardView.writeToken(currentPlayer.getColor());
        this.#removeTurn()
        this.#turn.next();
        this.#updateTurn();
    }

    #updateTurn() {
        const currentPlayer = this.#turn.getCurrentPlayer();
        const player = document.getElementById(`player-${currentPlayer.getColor()}`);
        player.classList.add(`player__has-turn`); 
    }

    #removeTurn() {
        const currentPlayer = this.#turn.getCurrentPlayer();
        const player = document.getElementById(`player-${currentPlayer.getColor()}`);
        player.classList.remove(`player__has-turn`); 
    }
}