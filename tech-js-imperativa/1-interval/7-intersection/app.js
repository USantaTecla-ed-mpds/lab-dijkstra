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
let msg = `El intervalo [${minFirst}, ${maxFirst}] intersección con el intervalo [${minSecond}, ${maxSecond}] es el intervalo [`;
const left = minFirst > minSecond ? minFirst : minSecond;
const right = maxFirst < maxSecond ? maxFirst : maxSecond;
msg += `${left}, ${right}]`;
console.writeln(msg);