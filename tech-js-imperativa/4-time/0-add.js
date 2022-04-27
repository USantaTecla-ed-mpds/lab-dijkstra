const { Console } = require("console-mpds");
const console = new Console();

console.writeln(`Primera duración:`);
const hours = console.readNumber(`Dame las horas:`);
const minutes = console.readNumber(`Dame las minutos:`);
const seconds = console.readNumber(`Dame las segundos:`);

console.writeln(`\nSegunda duración:`);
const hours2 = console.readNumber(`Dame las horas:`);
const minutes2 = console.readNumber(`Dame las minutos:`);
const seconds2 = console.readNumber(`Dame las segundos:`);

console.writeln(
  `La suma es ${
    minutes + minutes2 > 60 ? hours + hours2 + 1 : hours + hours2
  }:${seconds + seconds2 > 60 ? minutes + minutes2 - 60 : minutes + minutes2}:${
    seconds + seconds2 > 60 ? minutes + minutes2 - 60 : minutes + minutes2
  }`
);
