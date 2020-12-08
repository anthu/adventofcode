const util = require('./util.js')

const TODAY = 7
const REGEXP_BAG = /[0-9] [a-z]+ [a-z]+ bag(s)?/g;
const INITIAL_BAG = "shiny gold"
async  function main() {
    const bags = util.getInputFromFile(TODAY)
        .split('\n')
    console.log("Part 1: " + part1(bags))
    console.log("Part 2: " + part2(bags))
}


function part1(bags) {
    let m = new Map()
    bags.forEach(bag => {
        let a = [...bag.matchAll(REGEXP_BAG)].map(el => el[0].split(' ').slice(1,3)).map(el => el[0] + " " + el [1])
        m.set(bag.split(' bags contain')[0], a)
    })
    
    return searchRecursively(m, new Set([INITIAL_BAG])).size - 1
}

function searchRecursively(map, resultSet) {
    let initLength = resultSet.size
    map.forEach((v, k) => {
        resultSet.forEach(rm => {
            if (v.includes(rm)) resultSet.add(k)
        })
    })
    return (resultSet.size === initLength) ? resultSet : searchRecursively(map, resultSet)
}

function part2(bags) {
    let m = new Map()
    bags.forEach(bag => {
        let a = [...bag.matchAll(REGEXP_BAG)].map(el => el[0].split(' ').slice(0,3))
        let b = new Map([...a.map(el => [el[1] + " " + el[2], parseInt(el[0])])])
        m.set(bag.split(' bags contain')[0], b)
    })
    return searchNumOfBags(m, INITIAL_BAG) - 1
}

function searchNumOfBags(map, color) {
    let agg = 1
    map.get(color)
        .forEach((v, k) => {
            agg += searchNumOfBags(map, k) * v
        })
    return agg
}

main();
