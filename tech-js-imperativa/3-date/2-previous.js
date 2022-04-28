const { Console } = require("console-mpds");
const console = new Console();

const day = console.readNumber(`Dame el día: `);
const month = console.readNumber(`Dame el mes: `);
const year = console.readNumber(`Dame el año: `);

let datePreviousMonth = day === 1 ? month - 1 : month;
datePreviousMonth = datePreviousMonth === 0 ? 12 : datePreviousMonth;
let datePreviousDay = day === 1  ? 30 : day - 1;
let datePreviousYear = day === 1  && month === 1 ? year - 1 : year;

console.writeln(`La fecha ${day}/${month}/${year} y el anterior es ${datePreviousDay}/${datePreviousMonth}/${datePreviousYear}`);
