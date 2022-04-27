const { Console } = require("console-mpds");
const console = new Console();
const abciseCoordinate = console.readNumber(
  `Dame la abcisa de la coordenada: `
);

const ordinateCoordinate = console.readNumber(
  `Dame la ordenada de la coordenada: `
);
let quadrant =
  abciseCoordinate > 0 && ordinateCoordinate > 0
    ? 1
    : ordinateCoordinate < 0 && abciseCoordinate < 0
    ? 3
    : abciseCoordinate < 0
    ? 2
    : 4;
console.writeln(
  `La coordenada (${abciseCoordinate}, ${ordinateCoordinate}) está en el ${quadrant}º cuadrante`
);
