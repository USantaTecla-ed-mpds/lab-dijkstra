const { Console } = require("console-mpds");
const console = new Console();

const day = console.readNumber(`Dame el día:`);
const mounth = console.readNumber(`Dame el mes:`);
const year = console.readNumber(`Dame el año:`);

console.write(
  `La fecha ${day}/${mounth}/${year} ${day <= 31 && mounth <= 12 ? "sí" : "no"} es válida`
);
