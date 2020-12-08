const util = require('./util.js')

const TODAY = 6

async  function main() {
    const groups = util.getInputFromFile(TODAY)
        .split('\n\n')
    console.log("Part 1: " + part1(groups))
    console.log("Part 2: " + part2(groups))
}

function part1(groups) {
    return groups.reduce((agg,group) =>  agg += new Set(group.replaceAll('\n', '').split('')).size, 0)
}

function part2(groups) {
    return groups.reduce((agg, group) => {
        const groupSize = group.split('\n').length
        let answers = new Map()
        
        group.replaceAll('\n', '')
            .split('')
            .forEach(
                answer => answers.set(answer, (answers.get(answer) + 1) || 1)
            )

        return agg + [...answers].reduce((agg, [, v]) => agg + (v === groupSize), 0)
    }, 0)
}

main();
