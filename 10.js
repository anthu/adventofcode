const util = require('./util.js')

const TODAY = 10


function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n').map(e => parseInt(e))
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    ops = ops.sort((a,b)=>a-b)
    let i = 0, e = 0

    for (let a = 1; a<ops.length;a++) {
        let o = ops[a] - ops[a-1]
        if(o === 1) {
            i++
        } else if (o === 3) {
            e++
        }
            
    }
    return (i+1)*(e+1)
}

// custom offset tribonacci(0)=1 tribonacci(1)=1
let tribonacci_cust = (n) => n < 0 
    ? 0 
    : n < 2 
        ? 1
        : tribonacci_cust(n-1) + tribonacci_cust(n-2) + tribonacci_cust(n-3)

function part2(ops) {
    return ops.sort((a,b)=>a-b)
        .map((elem, index) => elem - (ops[index-1] || 0))
        .join('')
        .split('3')
        .reduce((agg, el) => agg * tribonacci_cust(el.length), 1)
}

main();
