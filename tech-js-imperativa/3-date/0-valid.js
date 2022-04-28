const { Console } = require("console-mpds");
const console = new Console();

let day = console.readNumber(`Dame el día:`);
let mounth = console.readNumber(`Dame el mes:`);
let year = console.readNumber(`Dame el año:`);

console.write(
  `La fecha ${day}/${mounth}/${year} ${day <= 31 && mounth <= 12 ? "sí" : "no"} es válida`
);
