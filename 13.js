const util = require('./util.js')

const TODAY = 13

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let earliest = parseInt(ops[0])
    let busses = ops[1].split(',').filter(e=>e!='x').map(e=>parseInt(e))
    let busNr = 0
    let waittime  = Number.MAX_SAFE_INTEGER

    for(bus of busses) {
        if((bus - (earliest % bus)) < waittime) {
            busNr = bus
            waittime = (bus - (earliest % bus))
        }
    }
    return busNr * waittime
}

function part2(ops) {
    let busses = ops[1].split(',')
    let mappings = busses.map((e, i) => [e, i]).filter(e => e[0] != 'x').map(e=>[parseInt(e[0]), e[1]]).sort((a,b) => b[0]-a[0])
    return mappings.reduce((agg, bus) => { // agg[0] => currentTimestamp, agg[1] => Step
        while ((agg[0] + bus[1]) % bus[0] !== 0) {
            agg[0] += agg[1];
        }
        agg[1] = agg[1] * bus[0];
        return agg
    },[0, 1])[0]
}


main();
