import { GameView } from "./DoubleDispatch/view/GameView.js";

const dialogPlayers = document.getElementsByClassName('dialog__players')[0];
dialogPlayers.addEventListener('close', () => {
    const humanPlayers  = dialogPlayers.returnValue;
    gameView.reset(humanPlayers);
});

const dialogFinished = document.getElementsByClassName('dialog__finished')[0];
dialogFinished.addEventListener('close', () => {
    const response = dialogFinished.returnValue;
    if (response === 'yes') {
        gameView.newGame();
    }
});

const gameView = new GameView(dialogPlayers, dialogFinished);

gameView.newGame();

window.dropToken = function(column) {
    gameView.dropToken(column);
}

window.newGame = function() {
    gameView.newGame();
}
