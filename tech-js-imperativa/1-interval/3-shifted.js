const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber(`Introduce el mínimo del intervalo:`);
const max = console.readNumber(`Introduce el máximo del intervalo (superior o igual al mínimo):`);
const displacement = console.readNumber(`Introduce un factor de desplazamiento:`);
console.writeln(`El intervalo [${min}, ${max}] con factor de desplazamiento ${displacement} es el intervalo [${min + displacement}, ${max + displacement}]`);
