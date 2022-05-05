// const { Console } = require("console-mpds");
// const console = new Console();

// const numerator = console.readNumber(`Introduce el numerador de la fracción: `);
// const denominator = console.readNumber(`Introduce el denominador de la fracción: `);
// let greatestCommonDivisor;

// if (numerator > denominator){
//     let i = denominator;
//     while(i > 1){
//          if (denominator%i ===0){
//             if (numerator%i === 0)
//                 greatestCommonDivisor = i;        
//             }
//         i--;
//     }
// }else if (numerator < denominator){
//     let i = numerator;
//     while(i > 1){
//          if (numerator%i ===0){
//             if (denominator%i === 0)
//                 greatestCommonDivisor = i;        
//             }
//         i--;
//     }
// }else {
//     greatestCommonDivisor = numerator;
// }
// console.writeln(`La fracción ${numerator}/${denominator} = ${numerator/greatestCommonDivisor}/\
// ${denominator/greatestCommonDivisor} invertida es la fracción ${denominator/greatestCommonDivisor}/\
// ${numerator/greatestCommonDivisor}`);

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