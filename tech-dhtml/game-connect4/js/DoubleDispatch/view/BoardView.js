import { Coordinate } from '../model/Coordinate.js'
import { Color } from '../model/Color.js'
import { assert } from '../utils/assert.js';
export class BoardView {

  #board;

  constructor(board, callback) {
    this.#board = board;
    this.#addEventClick(callback);
  }

  reset(currentColor) {
    assert(Color.isColorValid(currentColor));
    for (let row = 0; row < Coordinate.MAX_ROWS; row++) {
      for (let column = 0; column < Coordinate.MAX_COLUMNS; column++) {
        let className = 'board__cell';
        if (row === Coordinate.MAX_ROWS - 1) {
          className += ' board__header';
        }

        const color = this.#board.getColor(new Coordinate(row, column));
        className += color ? ` has-${color}` : ``;

        document.querySelector(`#cell-${row}${column}`).className = className;
        document.querySelector(`#checker-${row}${column}`).checked = Boolean(color);
      }
    }
    this.changeBoardTurn(currentColor);
  }

  #addEventClick(callback) {
    assert(typeof callback === 'function')
    document.querySelectorAll('.board__header').forEach((element, key) => {
      element.addEventListener('click', () => {
        callback(key)
      })
    })
  }

  writeToken(currentColor) {
    assert(Color.isColorValid(currentColor));
    const currentCoordinate = this.#board.getCurrentCoordinate();
    document.getElementById(`cell-${currentCoordinate.row}${currentCoordinate.column}`).classList.add(`has-${currentColor}`);
    document.getElementById(`checker-${currentCoordinate.row}${currentCoordinate.column}`).checked = true;
  }

  changeBoardTurn(currentColor) {
    assert(Color.isColorValid(currentColor));
    const header = document.querySelectorAll(`.board__header`);
    header.forEach((element, idx) => {
      element.className = 'board__header board__cell';
      element.classList.add(`turn-${currentColor}`)
    })
  }
}