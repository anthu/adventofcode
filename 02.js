const util = require('./util.js')

const today = 2
const REGEX_INPUT = /(?<ruleMin>\d+)-(?<ruleMax>\d+)\s(?<ruleLetter>\w):\s(?<password>\w+)/

async  function main() {
    var input = util.getInputFromFile(today);

    const lines = input
        .split('\n')

    var answer1 = part1(lines)
    console.log("Part 1: " + answer1)

    var answer2 = part2(lines)
    console.log("Part 2: " + answer2)
}


function part1(lines) {
    var result = 0
    lines.forEach(line => {
        const {groups: {ruleMin, ruleMax, ruleLetter, password}} = REGEX_INPUT.exec(line)
        var letterCount = password.split('').filter(c => c === ruleLetter).length;
        result += (letterCount >= ruleMin && letterCount <= ruleMax)
    })
    return result
}

function part2(lines) {
    var result = 0
    lines.forEach(line => {
        const {groups: {ruleMin, ruleMax, ruleLetter, password}} = REGEX_INPUT.exec(line)
        result +=  (password.charAt(ruleMin - 1) === ruleLetter ^ password.charAt(ruleMax - 1) === ruleLetter)
    })
    return result
}

main();