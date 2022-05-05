const { Console } = require("console-mpds");
const console = new Console();

let numerator = console.readNumber(`Introduce el numerador de la fracción:`);
let denominator = console.readNumber(`Introduce el denominador de la fracción:`);
let msg = `La fracción ${numerator}/${denominator}`;

if (numerator != 0 && denominator != 0) {
    let mcd = 1;
    if (numerator === denominator) {
        mcd = numerator;
    }
    let numeratorSimplified = numerator;
    let denominatorSimplified = denominator;
    while (numeratorSimplified != denominatorSimplified) {
        if (numeratorSimplified > denominatorSimplified) {
            numeratorSimplified -= denominatorSimplified;
            mcd = numeratorSimplified;
        }
        else {
            denominatorSimplified -= numeratorSimplified;
            mcd = denominatorSimplified;
        }
    }
    if (mcd > 1) {
        numerator /= mcd;
        denominator /= mcd;
        msg += ` = ${numerator}/${denominator}`;
    }
}
console.writeln(`${msg} invertida es la fracción ${denominator}/${numerator}`);
