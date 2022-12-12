import { GameView } from "./DoubleDispatch/view/GameView.js";

class Connect4 {

  #gameView = new GameView();
  #newGame = document.querySelector('#new-game');
  #exitGame = document.querySelector('#exit-game');

  constructor() {
    this.#addEnventNewGame();
    this.#addEnventExitGame();
    this.#gameView.newGame();
  }

  #addEnventNewGame() {
    this.#newGame.addEventListener('click', this.#gameView.newGame.bind(this.#gameView));
  }

  #addEnventExitGame() {
    this.#exitGame.addEventListener('click', () => {
      if (confirm(`Do you want to exit`)) {
        window.close();
      }
    });
  }
}

window.onload = () => {
  new Connect4();
};
