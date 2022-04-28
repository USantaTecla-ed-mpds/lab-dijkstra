const { Console } = require("console-mpds");
const console = new Console();

const SECONDS_HOUR = 3600;
const SECONDS_MINUTE = 60;

const msgDay = `Dame las horas:`;
const msgMonth = `Dame los minutos:`;
const msgYear = `Dame los segundos:`;

const hoursFirst = console.readNumber(`Primera duración:
${msgDay}`);
const minutesFirst = console.readNumber(`${msgMonth}`);	
const secondsFirst = console.readNumber(`${msgYear}`);

const hoursSecond = console.readNumber(`Segunda duración:
${msgDay}`);
const minutesSecond = console.readNumber(`${msgMonth}`);
const secondsSecond = console.readNumber(`${msgYear}`);

const sum = (hoursFirst + hoursSecond) * SECONDS_HOUR + (minutesFirst + minutesSecond) * SECONDS_MINUTE + secondsFirst + secondsSecond;

const totalHours = sum / SECONDS_HOUR - (sum % SECONDS_HOUR / SECONDS_HOUR);
const totalMinutes = sum % SECONDS_HOUR / SECONDS_MINUTE - (sum % SECONDS_HOUR % SECONDS_MINUTE / SECONDS_MINUTE);
const totalSeconds = sum % SECONDS_HOUR % SECONDS_MINUTE;

console.writeln(`La suma es ${totalHours}:${totalMinutes}:${totalSeconds}`);
