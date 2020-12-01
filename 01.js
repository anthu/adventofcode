const util = require('./util.js')

const targetValue = 2020
const today = 1

async  function main() {
    var input = await util.getInput(today);
    const lines = input
        .split('\n')
        .map(Number)
            
    var answer1 = part1(lines)
    console.log("Part 1: " + answer1)
    
    var answer2 = part2(lines)
    console.log("Part 2: " + answer2)

    // sendAnswers(answer1, answer2)
}


function part1(lines) {
    for(var i = 0; i < lines.length - 1; i++) {
        for(var j = i+1; j < lines.length; j++) {
            if(targetValue === lines[i] + lines[j]) {
                return lines[i] * lines[j]
            }
        }
    }
}

function part2(lines) {
    for(var i=0; i<lines.length - 2; i++) {
        for(var j = i + 1; j < lines.length - 1; j++) {
            for(var k = j + 1; k < lines.length; k++) {
                if(targetValue === lines[i] + lines[j] + lines[k]) {
                    return lines[i] * lines[j] * lines[k]
                }
            }
        }
    }
}

function sendAnswers(answer1, answer2) {
    util.sendAnswer(today, 1, answer1)
        .then(console.log)
        .catch(console.error)

    util.sendAnswer(today, 2, answer2)
        .then(console.log)
        .catch(console.error)
}


main();