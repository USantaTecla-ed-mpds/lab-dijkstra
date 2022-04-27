const { Console } = require("console-mpds");
const console = new Console();

const abciseCoordinate = console.readNumber(
  `Dame la abcisa de la coordenada: `
);
const ordinateCoordinate = console.readNumber(
  `Dame la ordenada de la coordenada: `
);
let msg = `La coordenada (${abciseCoordinate}, ${ordinateCoordinate})`;
const msgAbcises = ` está en el eje de abcisas`;
const msgOrdinates = ` está en el eje de ordenadas`;
const msgTwoAxes =
  abciseCoordinate === 0 && ordinateCoordinate === 0
    ? `${msgAbcises} y de ordenadas`
    : ``;
const msgOneAxe =
  msgTwoAxes === ``
    ? abciseCoordinate === 0
      ? msgAbcises
      : ordinateCoordinate === 0
      ? msgOrdinates
      : ``
    : msgTwoAxes;
msg += msgOneAxe === `` ? ` no está en ningún eje` : msgOneAxe;
console.writeln(msg);
