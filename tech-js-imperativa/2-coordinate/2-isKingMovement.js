const { Console } = require("console-mpds");
const console = new Console();

const msgAbcise = `Dame la abcisa de la coordenada: `;
const msgOrdinate = `Dame la ordenada de la coordenada: `;
const abciseOrigin = console.readNumber(`Coordenada origen:
${msgAbcise}`);
const ordinateOrigin = console.readNumber(`${msgOrdinate}`);
const abciseDestiny = console.readNumber(`Coordenada destino:
${msgAbcise}`);
const ordinateDestiny = console.readNumber(`${msgOrdinate}`);
let msg = `La coordenada origen (${abciseOrigin}, ${ordinateOrigin}) y la coordenada destino (${abciseDestiny}, ${ordinateDestiny}) `;
let diffAbciseAbsolute = abciseDestiny - abciseOrigin >= 0 ? abciseDestiny - abciseOrigin : (abciseDestiny - abciseOrigin) * -1;
let diffOrdinateAbsolute = ordinateDestiny - ordinateOrigin >= 0 ? ordinateDestiny - ordinateOrigin : (ordinateDestiny - ordinateOrigin) * -1;
let isInLineMovement = diffAbciseAbsolute <= 1 && diffOrdinateAbsolute <= 1 && (abciseOrigin === abciseDestiny || ordinateOrigin === ordinateDestiny);
let isInDiagonalMovement = diffAbciseAbsolute === diffOrdinateAbsolute && diffAbciseAbsolute === 1 && diffOrdinateAbsolute === 1;
msg += isInLineMovement || isInDiagonalMovement ? ` sí ` : ` no `;
msg += `es un movimiento del rey`;
console.writeln(msg);
