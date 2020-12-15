const util = require('./util.js')

const TODAY = 15,
    PART1_ITERATIONS = 2020,
    PART2_ITERATIONS = 30000000

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split(',')
        .map(e=>parseInt(e))

    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
   return run(ops, PART1_ITERATIONS)
}

function part2(ops) {
    return run(ops, PART2_ITERATIONS)
}

function run(input, iterations) {
    let lastSpoken = new Map(), nextNum = input[0]
    for (i = 0; i < input.length; i++) {
        [nextNum, lastSpoken] = lookupAndUpdateMap(input[i], lastSpoken, i+1)
    }
    for (i = (input.length + 1); i < iterations; i++) {
        [nextNum, lastSpoken] = lookupAndUpdateMap(nextNum, lastSpoken, i)
    }
    return nextNum
}

function lookupAndUpdateMap(num, map, curIteration) {
    const lastSeen = map.get(num)
    map.set(num, curIteration)
    return !lastSeen ? [0, map] : [curIteration - lastSeen, map]
}

main();
