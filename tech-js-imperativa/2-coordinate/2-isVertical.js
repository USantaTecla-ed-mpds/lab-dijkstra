const { Console } = require("console-mpds");
const console = new Console();

console.writeln(`Coordenada origen:`);
const abscissaOrigin = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordinateOrigin = console.readNumber(`Dame la ordenada de la coordenada:`);
console.writeln(`Coordenada destino:`);
const abscissaDestiny = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordinateDestiny = console.readNumber(`Dame la ordenada de la coordenada:`);

console.writeln(
  `La coordenada oringen (${abscissaOrigin}, ${ordinateOrigin}) y la coordenada destino (${abscissaDestiny}, ${ordinateDestiny}) ${
    abscissaOrigin === abscissaDestiny ? "si" : "no"
  } es un movimiento vertical`
);
