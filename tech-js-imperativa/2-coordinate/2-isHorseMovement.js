const { Console } = require("console-mpds");
const console = new Console();

const LONG_MOVE = 2;
const SHORT_MOVE = 1;
console.writeln(`Coordenada origen:`);
const abcissaOrigin = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordinateOrigin = console.readNumber(`Dame la ordenada de la coordenada:`);
console.writeln(`Coordenada destino:`);
const abcissaDestiny = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordinateDestiny = console.readNumber(`Dame la ordenada de la coordenada:`);

console.writeln(
  `La coordenada oringen (${abcissaOrigin}, ${ordinateOrigin}) y la coordenada destino (${abcissaDestiny}, ${ordinateDestiny}) ${
    (abcissaOrigin + LONG_MOVE === abcissaDestiny || abcissaOrigin - LONG_MOVE === abcissaDestiny) &&
    (ordinateOrigin + SHORT_MOVE === ordinateDestiny || ordinateOrigin - SHORT_MOVE === ordinateDestiny)
      ? "sí"
      : "no"
  } es un movimiento de caballo`
);
