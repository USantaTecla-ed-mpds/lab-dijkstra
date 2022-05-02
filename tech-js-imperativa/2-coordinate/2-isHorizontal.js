const { Console } = require("console-mpds");
const console = new Console();

console.writeln(`Coordenada origen:`);
const abcissaOrigin = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordinateOrigin = console.readNumber(`Dame la ordenada de la coordenada:`);
console.writeln(`Coordenada destino:`);
const abcissaDestiny = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordinateDestiny = console.readNumber(`Dame la ordenada de la coordenada:`);

console.writeln(
  `La coordenada oringen (${abcissaOrigin}, ${ordinateOrigin}) y la coordenada destino (${abcissaDestiny}, ${ordinateDestiny}) ${
    ordinateOrigin === ordinateDestiny ? "si" : "no"
  } es un movimiento horizontal`
);
