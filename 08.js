const util = require('./util.js')

const TODAY = 8

async  function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
        .map(el => el.split(' '))
        .map(el => [el[0], parseInt(el[1])])
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let visited = new Set()
    let ptr = 0, acc = 0

    while (!visited.has(ptr)) {
        visited.add(ptr)
        switch(ops[ptr][0]) {
            case 'acc':
                acc += ops[ptr][1]
                ptr++
                break
            case 'jmp':
                ptr += ops[ptr][1]
                break
            default:
                ptr++
        }
    }

    return acc
}

function part2(ops) {
    let visited = new Set(), possibleFlaws = new Set()
    let ptr = 0

    while (!visited.has(ptr)) {
        visited.add(ptr)
        switch(ops[ptr][0]) {
            case 'acc':
                ptr++
                break
            case 'jmp':
                possibleFlaws.add(ptr)
                ptr += ops[ptr][1]
                break
            default:
                possibleFlaws.add(ptr)
                ptr++
        }
    }

    for(flaw of Array.from(possibleFlaws)) {
        let visited = new Set()
        let opsCopy = JSON.parse(JSON.stringify(ops));
        let ptr = 0, acc = 0

        opsCopy[flaw][0] = opsCopy[flaw][0] === 'nop' ? 'jmp' : 'nop'

        
        while (!visited.has(ptr) && ptr<opsCopy.length) {
            visited.add(ptr)
            switch(opsCopy[ptr][0]) {
                case 'acc':
                    acc += ops[ptr][1]
                    ptr++
                    break
                case 'jmp':
                    ptr += ops[ptr][1]
                    break
                default:
                    ptr++
            }
        }

        if(ptr === opsCopy.length) {
            return acc
        }
    }

    return -1
}

main();
