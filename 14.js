const util = require('./util.js')

const TODAY = 14
const MASK = 'mask'

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
        .map(e=>e.split(' = '))
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let maskArr = [], abs=new Map()

    for (op of ops) {
        if (op[0] === MASK) {
            maskArr = op[1].split('')
        }
        else {
            let targetAddress = op[0].match(/[0-9]+/)[0]
            
            let memValueBinArr = parseInt(op[1])
                .toString(2)                        // Convert to binary
                .padStart(36, '0')                  // Pad string with zeroes
                .split('')                          // Convert to array

            let res = [...maskArr]
                .map((e, index) => e === 'X' ? memValueBinArr[index] : e) // If 'X' then replace else keep Mask value
            
            abs.set(targetAddress, parseInt(res.join(''), 2)) // Overwrite Memory
        }
    }

    
    return [...abs.values()].reduce((a, e) => a+=e, 0) // Sum up all memory values
}

function part2(ops) {
    let maskArr = []
    const abs=new Map()
    for (op of ops) {
        if (op[0] === MASK) {
            maskArr = op[1].split('')
        }
        else {
            const memory = parseInt(op[0]
                .match(/[0-9]+/)[0])
                .toString(2)
                .padStart(36, '0')
                .split('')
            const value = parseInt(op[1])
            let indices = []
            const res = [...maskArr].map((e, index) => {
                if (e === 'X') {
                    indices.push(index)
                } else if(e === '0') {
                    return memory[index]
                }
                return e
            })

            for(j = 0; j < 2**indices.length; j++) {
                const bin = j.toString(2).padStart(indices.length, '0').split('')
                let res_tmp = [...res]
                bin.forEach((e, i) => {
                    res_tmp[indices[i]] = e
                })
                abs.set(parseInt(res_tmp.join(''),2), value)
            }
        }
    }

    return [...abs.values()].reduce((a,e) => a += e)
}


main();
