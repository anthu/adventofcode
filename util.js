const fs = require('fs');

var getInputFromFile = day => {
    if (day < 10) {
        day = "0" + day
    }

    const data = fs.readFileSync(day + '.in', 'UTF-8');
    return data
}

module.exports.getInputFromFile = getInputFromFile;
module.exports.i = getInputFromFile;