const { Console } = require("console-mpds");
const console = new Console();

const dia = console.readNumber(`Dame el día:`);
const mes = console.readNumber(`Dame el mes:`);
const anyo = console.readNumber(`Dame el año:`);

console.write(
  `La fecha es ${dia}/${mes}/${anyo} y la anterior es ${
    dia === 1 ? 31 : dia - 1
  }/${dia === 1 && mes - 1 !== 0 ? mes - 1 : 12}/${
    dia === 1 && mes === 1 ? anyo - 1 : anyo
  } `
);
