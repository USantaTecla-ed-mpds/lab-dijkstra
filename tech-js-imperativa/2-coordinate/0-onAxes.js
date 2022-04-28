const { Console } = require("console-mpds");
const console = new Console();

const abciseCoordinate = console.readNumber(
  `Dame la abcisa de la coordenada: `
);
const ordinateCoordinate = console.readNumber(
  `Dame la ordenada de la coordenada: `
);

const msgAbcises = ` está en el eje de abcisas`;
const msgOrdinates = ` está en el eje de ordenadas`;
let msgAxes = abciseCoordinate === 0 && ordinateCoordinate === 0
    ? `${msgAbcises} y de ordenadas`
    : ``;
msgAxes =  msgAxes === ``
    ? abciseCoordinate === 0 ? msgAbcises : ordinateCoordinate === 0 ? msgOrdinates : ``
    : msgAxes;
let msg = `La coordenada (${abciseCoordinate}, ${ordinateCoordinate})`;
msg += msgAxes === `` ? ` no está en ningún eje` : msgAxes;
console.writeln(msg);
