import { assert } from "../../utils/assert.js";
import { Game } from "../../models/Game.js";
import { Turn } from "../../models/Turn.js";
import { BoardView } from "./BoardView.js";
import { TurnView } from "./TurnView.js";

export class GameView {

  #game;
  #turnView;
  #boardView;

  #dialogPlayers = document.querySelector('#dialog__players');
  #dialogFinished = document.querySelector('#dialog-yes-no');

  constructor() {
    this.#game = new Game();
    this.#turnView = new TurnView(this.#game.getTurn());
    this.#boardView = new BoardView(this.#game.getBoard(), this.#dropToken.bind(this));
    this.#addEnventButtonNewGame();
    this.#addEventDialogPlayers();
    this.#addEventDialogFinished();
    this.#addEventButtonSaveGame();
    this.#addEventButtonRecoverGame();
    this.#init();
  }

  #addEnventButtonNewGame() {
    document.querySelector('#new-game').addEventListener('click', this.#init.bind(this));
  }

  #addEventDialogPlayers() {
    this.#dialogPlayers.addEventListener('close', () => {
      const humanPlayers = this.#dialogPlayers.returnValue;
      this.#reset(humanPlayers);
      sessionStorage.setItem('humanPlayers', humanPlayers);
    });
  }

  #addEventDialogFinished() {
    this.#dialogFinished.addEventListener('close', () => {
      const response = this.#dialogFinished.returnValue;
      if (response === 'yes') {
        this.#init();
      }
    });
  }

  #addEventButtonSaveGame() {
    document.querySelector('#save-game').addEventListener('click', () => {
      let humanPlayers = sessionStorage.getItem('humanPlayers');
      const game = {
        humanPlayers,
        turn: this.#game.getCurrentTurn(),
        colors: this.#game.getBoard().getColors()
      }
      localStorage.setItem('game', JSON.stringify(game));
      alert("Game saved");
    });
  }

  #addEventButtonRecoverGame() {
    document.querySelector('#recover-game').addEventListener('click', () => {
      const game = JSON.parse(localStorage.getItem('game'));
      this.#reset(game.humanPlayers, game.colors, game.turn);
    });
  }

  #init() {
    this.#dialogPlayers.showModal();
  }

  #reset(humanPlayers, colors = null, currentTurn = 0) {
    assert(Turn.isNumberPlayerValid(humanPlayers));
    assert(Turn.isNumberTurnValid(currentTurn));
    this.#game.reset(humanPlayers, colors, currentTurn);
    const currentColor = this.#game.getCurrentPlayer().getColor();
    this.#boardView.reset(currentColor);
    this.#turnView.reset();
    this.#play();
  }

  #play() {
    this.#game.getCurrentPlayer().accept(this)
  }

  visitHuman() {
    this.#boardView.addEventClick();
    this.#boardView.changeTurn(this.#game.getCurrentPlayer().getColor())
  }

  visitRandom() {
    this.#boardView.removeEventClick();
    this.#boardView.removeHeaderTurn();
    setTimeout(() => {
      this.#dropToken()
    }, 300)
  }

  #dropToken(column) {
    assert(!this.#game.isFinished());
    this.#turnView.play(column);
    this.#boardView.writeToken(this.#game.getCurrentPlayer().getColor(), this.#game.getCurrentTurn());
    const gameFinished = this.#game.isFinished();
    if (!gameFinished) {
      this.#turnView.changeTurn();
      this.#play();
    } else {
      this.#writeResult();
    }
  }

  #writeResult() {
    let msg;
    if (this.#game.isWinner()) {
      this.#boardView.highlightLineWinner(this.#game.getBoard().getLine());
      msg = `The winner is the player ${this.#game.getCurrentPlayer().getColor().toString().toUpperCase()}`;
    } else {
      msg = `Tied Game`;
    }
    this.#boardView.removeEventClick();
    this.#boardView.removeHeader();
    document.querySelector('#dialog-yes-no__title').innerHTML = msg;
    this.#dialogFinished.showModal();
  }
}

window.onload = () => {
  new GameView();
};