export class BoardView {

    #board;
  
    constructor(board) {
      this.#board = board;
      this.#reset();
    }

    #reset() {
        for(let column = 0; column < 7; column++) {
            for(let row = 0; row < 6; row++) {
                const cell = document.getElementById(`cell-${column}${row}`);
                cell.className = 'board__cell';
                const checker = document.getElementById(`checker-${column}${row}`);
                checker.checked = false;
            }
        }
    }

    writeToken(color) {
        const currentCoordinate = this.#board.getCurrentCoordinate();
        const cell = document.getElementById(`cell-${currentCoordinate.column}${currentCoordinate.row}`);
        cell.classList.add(`has-${color}`);
        const checker = document.getElementById(`checker-${currentCoordinate.column}${currentCoordinate.row}`);
        checker.checked = true;
    }
}