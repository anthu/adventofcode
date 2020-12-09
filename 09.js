const util = require('./util.js')

const TODAY = 9
const PREAMBLE = 25

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n').map(e => parseInt(e))
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    for(let i = PREAMBLE; i < ops.length; i++) {
        found = false
        for(j = i - PREAMBLE; j < i-1; j++) {
            for (k=j+1; k<i;k++) {
                if (ops[i] === ops[k] + ops[j])
                    found = true
            }
        }

        if (!found){
            return ops[i]
        } 
    }
}

function part2(ops) {
    let result = part1(ops)
    ops = ops.slice(0, ops.indexOf(result))

    for(let i = 0; i < ops.length;i++) {
        for(let ptr=i, res = 0; ptr < ops.length && res < result; ptr++){
            res += ops[ptr]
            
            if(res === result) {
                let elements = ops.slice(i, ptr)
                return(Math.max(...elements) + Math.min(...elements))
            }
        }
    }
}

main();
