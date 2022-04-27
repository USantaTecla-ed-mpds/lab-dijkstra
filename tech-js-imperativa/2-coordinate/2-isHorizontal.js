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
    ordOrigin === ordDestiny ? "si" : "no"
  } es un movimiento horizontal`
);
