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
  #newGame = document.querySelector('#new-game');
  #saveGame = document.querySelector('#save-game');
  #recoverGame = document.querySelector('#recover-game');

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

  #init() {
    this.#dialogPlayers.showModal();
  }

  #reset(humanPlayers, colors = null, currentTurn = 0) {
    assert(Turn.isNumberPlayerValid(humanPlayers));
    assert(Turn.isNumberTurnValid(currentTurn));
    this.#game.reset(humanPlayers, colors, currentTurn);
    const currentColor = this.#game.getCurrentPlayer().getColor();
    this.#boardView.reset(currentColor, humanPlayers > 0 ? true : false);
    this.#turnView.reset();
    this.#play();
  }

  #play() {
    this.#game.getCurrentPlayer().accept(this)
  }

  visitHuman() {
  }

  visitRandom() {
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
    this.#boardView.removeTurnHeader();
    document.querySelector('#dialog-yes-no__title').innerHTML = msg;
    this.#dialogFinished.showModal();
  }

  #addEnventButtonNewGame() {
    this.#newGame.addEventListener('click', this.#init.bind(this));
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
    this.#saveGame.addEventListener('click', () => {
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
    this.#recoverGame.addEventListener('click', () => {
      const game = JSON.parse(localStorage.getItem('game'));
      this.#reset(game.humanPlayers, game.colors, game.turn);
    });
  }
}

window.onload = () => {
  new GameView();
};