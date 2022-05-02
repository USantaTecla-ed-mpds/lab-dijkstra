const { Console } = require("console-mpds");
const console = new Console();

console.writeln(`Coordenada origen:`);
const absOrigin = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordOrigin = console.readNumber(`Dame la ordenada de la coordenada:`);
console.writeln(`Coordenada destino:`);
const absDestiny = console.readNumber(`Dame la abcisa de la coordenada:`);
const ordDestiny = console.readNumber(`Dame la ordenada de la coordenada:`);

console.writeln(
  `La coordenada oringen (${absOrigin}, ${ordOrigin}) y la coordenada destino (${absDestiny}, ${ordDestiny}) ${
    absOrigin === absDestiny ? "si" : "no"
  } es un movimiento vertical`
);
