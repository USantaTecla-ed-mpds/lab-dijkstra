import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";
import { Game } from "../model/Game.js";
import { BoardView } from "./BoardView.js";
import { TurnView } from "./TurnView.js";

export class GameView {

    #game;
    #turnView;
    #boarView;

    #dialogPlayers;
    #dialogFinished;

    constructor(dialogPlayers, dialogFinished) {
        this.#dialogPlayers = dialogPlayers;
        this.#dialogFinished = dialogFinished;
    }

    newGame() {
        this.#dialogPlayers.showModal();
    }

    reset(humanPlayers) {
        this.#game = new Game(humanPlayers);
        this.#boarView = new BoardView(this.#game.getBoard());
        this.#turnView = new TurnView(this.#game.getTurn(), this.#boarView);
        this.#play();
    }

    #play() {
        let gameFinished;
        let turnResponse;
        do {
            turnResponse = this.#turnView.play();
            gameFinished = this.#game.isFinished();
            if (gameFinished) {
                this.#writeResult();
            }
        } while(!gameFinished && turnResponse === 'automaticOperation');
    }

    dropToken(column) {
        assert(Coordinate.isColumnValid(column));
        this.#turnView.dropToken(column)
        const gameFinished = this.#game.isFinished();
        if (!gameFinished) {
            this.#turnView.play();
        } else {
            this.#writeResult();
        }
    }
  
    #writeResult() {
        let msg;
        if (this.#game.getBoard().isWinner()) {
            msg = `The winner is the player ${this.#game.getTurn().getCurrentPlayer().getColor().toUpperCase()}`;
        } else {
            msg = `Tied Game`;
        }
        document.getElementsByClassName('dialog__finished-title')[0].innerHTML = msg;
        this.#dialogFinished.showModal();
    }
  }