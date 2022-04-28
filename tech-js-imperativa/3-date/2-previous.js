const { Console } = require("console-mpds");
const console = new Console();

const day = console.readNumber(`Dame el día: `);
const month = console.readNumber(`Dame el mes: `);
const year = console.readNumber(`Dame el año: `);

let monthDatePrevious = day === 1 ? month - 1 : month;
monthDatePrevious = monthDatePrevious === 0 ? 12 : monthDatePrevious;
daysMonth = monthDatePrevious === 2 ? (year % 4 === 0 ? 29 : 28) : (monthDatePrevious === 4 || monthDatePrevious === 6 || monthDatePrevious === 9 || monthDatePrevious === 11 ? 30 : 31);
let dayDatePrevious =  day === 1  ? daysMonth : day - 1;
let yearDatePrevious = day === 1  && month === 1 ? year - 1 : year;

console.writeln(`La fecha ${day}/${month}/${year} y el anterior es ${dayDatePrevious}/${monthDatePrevious}/${yearDatePrevious}`);
