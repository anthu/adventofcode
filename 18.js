const util = require('./util.js')

const TODAY = 18

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    res = 0
    for(op of ops) {
        paranthesis_found = true
        while (paranthesis_found) {
            [maxLvl, start_index, end_index] = getMaxLevel(op)
            if (maxLvl > 0) {
                op = ''.concat(op.substring(0, start_index), solve(op.substring(start_index + 1, end_index)), op.substring(end_index+1))
            } else {
                paranthesis_found = false
            }
        }
        let b = parseInt(solve(op))
        res += b
    }
    return res
}

function getMaxLevel(op) {
    var matches = [...op.matchAll(/\(|\)/gi)]
    let res = 0
    let level = 0
    let index = -1
    for(let i = 0; i < matches.length;i++) {
        if(matches[i][0] === '(') {
            level++
            if(level > res) {
                res = level
                index = i
            }
        } else {
            level--
        }
    }
    if(res > 0) {
        return [res, matches[index].index, matches[index+1].index] 
    } else {
        return [0, -1, -1]
    }
}

function solve(op) {
    if(!op || op.trim().length === 0) {
        return 0
    }
    let matches = [...op.matchAll(/\+|\*/gi)]
    if(matches.length > 1) {
        let left = op.substring(0, matches[1].index)
        let leftStr = eval(left).toString()
        return solve(leftStr.concat(' ', op.substring(matches[1].index)))
    } else {
        return eval(op).toString()
    }
}

function solve2(op) {
    if(!op || op.trim().length === 0) {
        return 0
    }
    let matches = [...op.matchAll(/\+|\*/gi)]
    let plusMatches = [...op.matchAll(/\+/gi)]
    let multMatches = [...op.matchAll(/\*/gi)]
    if(plusMatches.length === 0 || multMatches.length === 0) {
        return eval(op).toString()
    } else {
        for (let i = 0; i < matches.length; i++) {
            if(matches[i][0] === '+') {
                if(matches[i - 1] && matches[i + 1]) {
                    return solve2(''.concat(
                        op.substring(0, matches[i - 1].index  + 1), 
                        solve2(op.substring(matches[i-1].index + 1, matches[i+1].index - 1)), 
                        op.substring(matches[i + 1].index)))
                } else if (i === 0 && matches[i + 1]){
                    return solve2(''.concat(
                        solve2(op.substring(0, matches[i + 1].index)), ' ',
                        op.substring(matches[i + 1].index)))
                } else if (matches[i - 1] && i === matches.length - 1) {
                    let a = ''.concat(
                        op.substring(0, matches[i - 1].index + 1), ' ',
                        solve2(op.substring(matches[i - 1].index + 1)))
                    return solve2(a)
                }
            }
        }
    }
}

function part2(ops) {
    res = 0
    for(op of ops) {
        paranthesis_found = true
        while (paranthesis_found) {
            [maxLvl, start_index, end_index] = getMaxLevel(op)
            if (maxLvl > 0) {
                op = ''.concat(
                    op.substring(0, start_index), 
                    solve2(op.substring(start_index + 1, end_index)), 
                    op.substring(end_index+1))
            } else {
                paranthesis_found = false
            }
        }
        let b = parseInt(solve2(op))
        res += b
    }
    return res
}

main();
