const { join } = require('path')
const util = require('./util.js')

const TODAY = 10


function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n').map(e => parseInt(e))
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    console.log(ops)
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
    // let possibilities = [1,1,2,4,7]
    ops = ops.sort((a,b)=>a-b)
    return ops.map((elem, index) => elem - (ops[index-1] || 0))
        .join('')
        .split('3')
        .reduce((agg, el) => agg * tribonacci_cust(el.length), 1)
}

function part2_failing(ops) {
    ops.push(0)
    ops.push(Math.max(...ops) + 3)

    ops = ops.sort((a,b)=>a-b)
    posibilities = []
    for (let i = 1; i < ops.length - 1; i++) {
        if(ops[i+1] - ops[i-1] <= 3){
            posibilities.push(ops[i])
        }
    }
    let c = generatePowerSet(posibilities).reduce((agg, el) => agg + isValid(ops, el),0)
    return c
}

function generatePowerSet(array) {
    var result = [];
    result.push([]);
  
    for (var i = 1; i < (1 << array.length); i++) {
      var subset = [];
      for (var j = 0; j < array.length; j++)
        if (i & (1 << j))
          subset.push(array[j]);
  
      result.push(subset);
    }
  
    return result;
  }

function isValid(ops, toRemove) {
    let a = [...ops]
    for(re of toRemove) {
        a.splice(a.indexOf(re),1)
    }
    for(let i = 1; i < a.length; i++) {
        if((a[i] - a[i-1]) > 3) {
            return 0
        }
    }
    return 1
}
main();
