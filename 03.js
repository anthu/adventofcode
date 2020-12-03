const util = require('./util.js')

const today = 3
const combinations = [[1,1],[3,1],[5,1],[7,1],[1,2]]
const treeIdentifier = "#"

async  function main() {
    var input = util.getInputFromFile(today);

    const lines = input
        .split('\n')

    var answer1 = solve(lines, 3, 1)
    console.log("Part 1: " + answer1)

    let answer2 = combinations.reduce((acc,val) => acc * solve(lines,val[0],val[1]), 1)
    console.log("Part 2: " + answer2)
}

function solve(lines, right, down) {
    let res=0, row=0, col=0
    const lineLength = lines[0].length
    while (row < lines.length) {
        res += lines[row].charAt(col) === treeIdentifier
        row += down
        col = (col+right) % lineLength
    }
    
    return res
}

main();