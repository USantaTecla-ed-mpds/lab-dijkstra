const { Console } = require("console-mpds");
const console = new Console();
const msgReadMin = "Introduce el mínimo del intervalo:";
const msgReadMax = "Introduce el máximo del intervalo (superior o igual al mínimo):";
const minFirst = console.readNumber(`Primer intervalo:
${msgReadMin}`);
const maxFirst = console.readNumber(msgReadMax);
const minSecond = console.readNumber(`Segundo intervalo:
${msgReadMin}`);
const maxSecond = console.readNumber(msgReadMax);
let msg = `El intervalo [${minFirst}, ${maxFirst}]`;
msg += minFirst <= maxSecond && minSecond <= maxFirst || minSecond <= maxFirst && minFirst <= maxSecond ? ` sí ` : ` no `;
msg += `intersecta con el intervalo [${minSecond}, ${maxSecond}]`;
console.writeln(msg);
