function joinStrings(strings, separator = " ") {
    let result = "";

    if (strings == null || strings.length == 0) {
        return result;
    }
    
    for (let i = 0; i < strings.length - 1; i++) {
        result += strings[i] + separator;
    }
    result += strings[strings.length - 1];
    return result;
}


module.exports = {
    joinStrings
};