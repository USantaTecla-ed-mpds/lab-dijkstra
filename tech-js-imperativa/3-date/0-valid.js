const { Console } = require("console-mpds");
const console = new Console();

let dia = console.readNumber(`Dame el día:`);
let mes = console.readNumber(`Dame el mes:`);
let anyo = console.readNumber(`Dame el año:`);

console.write(
  `La fecha ${dia}/${mes}/${anyo} ${
    dia <= 31 && mes <= 12 ? "sí" : "no"
  } es válida`
);
