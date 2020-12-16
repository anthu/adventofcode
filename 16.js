const util = require('./util.js')

const TODAY = 16
const TO_CONSIDER = 20

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n\n')

    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let nearbyTickets = ops[2].split('\n').slice(1).join(',').split(',').map(e=>parseInt(e))
    let constrains = ops[0].split('\n').map(e=> e.split(': ')[1]).flatMap(e=>e.split(' or ')).map(e=>e.split('-').map(l=>parseInt(l)))
    let result = 0
    for(ticket of nearbyTickets) {
        let found = false
        for (constraint of constrains) {
            if (ticket >= constraint[0] && ticket <= constraint[1]) {
                found = true
            }
        }
        if(!found) {
            result+=ticket
        }
    }
    return result
}

function part2(ops) {
    let nearbyTickets = ops[2]
        .split('\n')
        .slice(1)
        .map(e=>e.split(',')
        .map(l=>parseInt(l)))
    let constrains = ops[0]
        .split('\n')
        .map(e=> e.split(': ')[1])
        .flatMap(e=>e.split(' or '))
        .map(e=>e.split('-')
            .map(l=>parseInt(l)))
    let myTickets = ops[1].split('\n')[1].split(',').map(e=>parseInt(e))
    
    let validTickets = []

    for (ticket of nearbyTickets) {
        valid = true
        for (t of ticket) {
            let found = false
            for (constraint of constrains) {
                if (t >= constraint[0] && t <= constraint[1]) {
                    found = true
                }
            }
            if(!found) {
                valid = false
            }
        }
        if(valid) {
            validTickets.push(ticket)
        }
    }
    let m = new Map()
    for(i = 0; i < TO_CONSIDER; i++) {
        let a = []
        for (let j = 0; j<validTickets[0].length;j++) {
            a.push(j)
        }
        m.set(i, a)
    }
    for (ticket of validTickets) {
        for(i = 0; i < TO_CONSIDER; i++) {
            a = m.get(i)
            c = [...a]
            for(b of a) {
                if((ticket[b] < constrains[2*i][0] ||  ticket[b] > constrains[2*i][1]) &&
                    (ticket[b] < constrains[2*i+1][0] ||  ticket[b] > constrains[2*i+1][1])) {
                      c.splice(c.indexOf(b),1)  
                }
            }
            m.set(i, c)
        }
    }

    let res = new Map()
    for(i = 0; i < myTickets.length;i++) {
        let rem = -1
        for(j = 0; j < myTickets.length; j++) {
            let tmp = m.get(j)
            if(tmp.length === 1) {
                res.set(j, tmp[0])
                rem = tmp[0]
            }
        }
        if(rem >= 0) {
            m.forEach((v, k) => {
                v.splice(v.indexOf(rem), 1)
                m.set(k, v)
            })
        }
    }
    let final = 1
    for (let i = 0; i < 6; i++) {
        final = final * myTickets[res.get(i)]
    }
    return final
}

main();
