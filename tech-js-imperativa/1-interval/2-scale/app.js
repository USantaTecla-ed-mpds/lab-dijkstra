const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber(`Introduce el mínimo del intervalo: `);
const max = console.readNumber(`Introduce el máximo del intervalo (superior o igual al mínimo): `);
const scaleFactor = console.readNumber(`Introduce un factor de escala positivo:`);
const newMin = min * scaleFactor;
const newMax = max * scaleFactor;
console.writeln(`El nuevo intervalo es [${newMin}, ${newMax}]`);
