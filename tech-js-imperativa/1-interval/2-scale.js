const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber(`Introduce el mínimo del intervalo: `);
const max = console.readNumber(`Introduce el máximo del intervalo (superior o igual al mínimo): `);
const scaleFactor = console.readString(`Introduce un factor de escala positivo:`);

const centerOfInterval = (min + max) / 2;
const distanceToCenter = centerOfInterval - min;
const scaledDistance = distanceToCenter * scaleFactor;
const newMin = centerOfInterval - scaledDistance;
const newMax = centerOfInterval + scaledDistance;
console.writeln(`El intervalo [${min}, ${max}] con factor de escala ${scaleFactor} es el intervalo [${newMin}, ${newMax}]`);
