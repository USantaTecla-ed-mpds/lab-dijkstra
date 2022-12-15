import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";
import { Human } from "../model/Human.js";
import { Random } from "../model/Random.js";

export class TurnView {

    #turn;

    constructor(turn) {
      this.#turn = turn;
    }

    reset() {
        this.#update()
    }

    play(column) {
        return this.#turn.getCurrentPlayer().accept(this, column);
    }

    visitRandom(random) {
        assert(random instanceof Random);
        random.dropToken();
    }

    visitHuman(human, column) {
        assert(human instanceof Human)
        assert(Coordinate.isColumnValid(column));
        human.dropToken(column);
    }

    changeTurn() {
        this.#turn.changeTurn();
        this.#update();
    }

    #update() {
        const players = document.querySelectorAll(`.player`);
        players.forEach(player => player.classList.remove(`player__has-turn`));
        const currentPlayer = this.#turn.getCurrentPlayer();
        document.getElementById(`player-${currentPlayer.getColor()}`).classList.add(`player__has-turn`); 
    }
}