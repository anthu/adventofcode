const util = require('./util.js')

const TODAY = 20

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n\n').map(e=> e.split('\n'))
    console.log("Part 1: " + part1(ops))
    // console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let result = 1
    let edgesMap = new Map()
    for (let i = 0; i < ops.length; i++) {
        
        let left = '', right = ''
        for (j = 1; j<=10; j++) {
            let row = ops[i][j].split('')
            left = left.concat(row[0])
            right = right.concat(row[9])
        }
        updateEdges(edgesMap, ops[i][1])
        updateEdges(edgesMap, ops[i][10])
        updateEdges(edgesMap, left)
        updateEdges(edgesMap, right)
    }

    for (let i = 0; i < ops.length; i++) {
        let left = ''
        let right = ''
        for (j = 1; j<=10; j++) {
            let row = ops[i][j].split('')
            left = left.concat(row[0])
            right = right.concat(row[9])
        }

        let uniqueEdges = 0 
            + (edgesMap.get(left) === 1) 
            + (edgesMap.get(right) === 1) 
            + (edgesMap.get(ops[i][1]) === 1) 
            + (edgesMap.get(ops[i][10]) === 1)
        
        if(uniqueEdges === 2) {
            let tile = ops[i][0].split(' ')[1].slice(0, -1)
            result *= parseInt(tile)
        }
    }
    return result
}

function updateEdges(edgesMap, edge) {
    edgesMap.set(edge, (edgesMap.get(edge) + 1) || 1)

    let reversedEdge = edge.split('').reverse().join('')
    edgesMap.set(reversedEdge, (edgesMap.get(reversedEdge) + 1) || 1)
}

main();
