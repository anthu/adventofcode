const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants')
const util = require('./util.js')

const TODAY = 14

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
        .map(e=>e.split(' = '))
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let mask = ''
    let abs=new Map()
    for (op of ops) {
        if (op[0] === 'mask') {
            mask = op[1]
        }
        else {
            let memory = op[0].match(/[0-9]+/)[0]
            let value = parseInt(op[1])
            let ab = value.toString(2).padStart(36, '0')
            let splittedAb = ab.split('')
            let splittedMask = mask.split('')
            let res = []
            for(let i = 0; i<36;i++) {
                if(splittedMask[i] === 'X') {
                    res.push(splittedAb[i])
                } else {
                    res.push(splittedMask[i])
                }
            }
            abs.set(memory, parseInt(res.join(''),2))
        }
    }
    let abs2 = 0
    abs.forEach(e => abs2 += e)
    return abs2
}

function part2(ops) {
    let mask = ''
    let abs=new Map()
    for (op of ops) {
        if (op[0] === 'mask') {
            mask = op[1]
        }
        else {
            let memory = parseInt(op[0].match(/[0-9]+/)[0])
            let ab =  memory.toString(2).padStart(36, '0')
            let value = parseInt(op[1])
            let splittedAb = ab.split('')
            let splittedMask = mask.split('')
            let res = []
            let indices = []
            for(let i = 0; i<36;i++) {
                if(splittedMask[i] === 'X') {
                    res.push('X')
                    indices.push(i)
                } else if(splittedMask[i] === '0') {
                    res.push(splittedAb[i])
                } else {
                    res.push('1')
                }
            }
            for(let j = 0; j < 2**indices.length; j++) {
                let bin = j.toString(2).padStart(indices.length, '0').split('')
                let res_tmp = [...res]
                for (let k = 0; k < bin.length; k++) {
                    res_tmp[indices[k]] = bin[k]
                }
                abs.set(parseInt(res_tmp.join(''),2), value)
            }
        }
    }
    let abs2 = 0
    abs.forEach(e => abs2 += e)
    return abs2
}


main();
