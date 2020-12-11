const util = require('./util.js')

const TODAY = 11


function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    ops = occupyAll(ops)
    let changed = false
    do {
        changed = false
        let res = [...ops]
        ops = ops.map(e=>e.split(''))
        res = res.map(e=>e.split(''))

        for (y = 0; y < ops.length; y++) {
            for (x = 0; x < ops[y].length; x++) {
                let adjacentCount = 0
                for(o = -1; o < 2; o++) {
                    for (p = -1; p < 2; p++){
                        adjacentCount += (ops[y+o] && (ops[y+o][x+p] === '#')) ? 1 : 0
                    }
                }
                if(ops[y][x] === '#' && adjacentCount >= 5) {
                    res[y][x] = 'L'
                    changed = true
                } else if(ops[y][x] === 'L' && adjacentCount === 0) {
                    res[y][x] = '#'
                    changed = true
                }
            }
        }
        res = res.map(e=>e.join(''))
        ops = [...res]
    } while (changed)

    return (ops.join('').match(/#/g) || []).length
}

function occupyAll(ops) {
    return ops.map(y => y.split('').map(x => x === 'L' ? '#' : '.').join(''))
}

function part2(ops) {
    const directions = [[-1,-1], [1, 1], [0, 1], [0, -1], [1, 0], [-1, 0], [-1, 1], [1, -1]]
    ops = occupyAll(ops)
    let changed = false, iterations = 0
    do {
        iterations++
        changed = false
        let res = [...ops]
        ops = ops.map(e=>e.split(''))
        res = res.map(e=>e.split(''))

        for (y = 0; y < ops.length; y++) {
            for (x = 0; x < ops[y].length; x++) {
                let adjacentCount = directions.reduce((a, direction) => {
                        let o = direction[1]
                        let p = direction[0]
                        do {
                            if(!ops[y+o] || !ops[y+o][x+p] || ops[y+o][x+p] === 'L') {
                                return a
                            } else if(ops[y+o][x+p] === '#') {
                                return a + 1
                            } else {
                                o+=direction[1]
                                p+=direction[0]
                            }
                        } while (true)
                }, 0)
                

                if(ops[y][x] === '#' && adjacentCount >= 5) {
                    res[y][x] = 'L'
                    changed = true
                } else if(ops[y][x] === 'L' && adjacentCount === 0) {
                    res[y][x] = '#'
                    changed = true
                }

            }
        }
        res = res.map(e=>e.join(''))
        ops = [...res]
    } while (changed)
    return (ops.join('').match(/#/g) || []).length
}


main();
