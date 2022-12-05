export const assert = function(condition) {
    if(!condition) {
        throw new Error();
    }
}