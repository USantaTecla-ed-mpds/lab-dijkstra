const { Console } = require("console-mpds");
const console = new Console();

console.writeln(`Coordenada origen:`);
let absOrigin = console.readNumber(`Dame la abcisa de la coordenada:`);
let ordOrigin = console.readNumber(`Dame la ordenada de la coordenada:`);
console.writeln(`Coordenada destino:`);
let absDestiny = console.readNumber(`Dame la abcisa de la coordenada:`);
let ordDestiny = console.readNumber(`Dame la ordenada de la coordenada:`);

console.writeln(
  `La coordenada oringen (${absOrigin}, ${ordOrigin}) y la coordenada destino (${absDestiny}, ${ordDestiny}) ${
    (absOrigin + 2 === absDestiny || absOrigin - 2 === absDestiny) &&
    (ordOrigin + 1 == ordDestiny || ordOrigin - 1 === ordDestiny)
      ? "si"
      : "no"
  } es un movimiento de caballo`
);
