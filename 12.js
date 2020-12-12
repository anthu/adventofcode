const util = require('./util.js')

const TODAY = 12
const DIRECTIONS = ['EAST', 'SOUTH', 'WEST', 'NORTH']

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let pos = [0, 0]
    let direction = 0
    ops.forEach(op => {
        let a = op.slice(0, 1)
        let b = parseInt(op.slice(1))
        switch (a) {
            case 'E':
                pos[1] += b
                break
            case 'S':
                pos[0] += b
                break
            case 'W':
                pos[1] += -b
                break
            case 'N':
                pos[0] += -b
                break
            case 'R':
                direction = (direction + b/90) % 4
                break
            case 'L':
                direction = ((direction - b/90) + 4) % 4
                break
            case 'F':
                switch (DIRECTIONS[direction]) {
                    case 'EAST':
                        pos[1] += b
                        break
                    case 'SOUTH':
                        pos[0] += b
                        break
                    case 'WEST':
                        pos[1] += -b
                        break
                    case 'NORTH':
                        pos[0] += -b
                        break
                }
        }
    })
    return Math.abs(pos[0]) + Math.abs(pos[1])
}

function part2(ops) {
    let pos = [0, 0]
    let waypoint = [-1, 10]
    ops.forEach(op => {
        let a = op.slice(0, 1)
        let b = parseInt(op.slice(1))
        switch (a) {
            case 'E':
                waypoint[1] += b
                break
            case 'S':
                waypoint[0] += b
                break
            case 'W':
                waypoint[1] += -b
                break
            case 'N':
                waypoint[0] += -b
                break
            case 'R':
                switch (b) {
                    case 90:
                        waypoint = [waypoint[1], -waypoint[0]]
                        break
                    case 180:
                        waypoint = [-waypoint[0], -waypoint[1]]
                        break
                    case 270:
                        waypoint = [-waypoint[1], waypoint[0]]
                        break
                }
                break
            case 'L':
                switch (b) {
                    case 90:
                        waypoint = [-waypoint[1], waypoint[0]]
                        break
                    case 180:
                        waypoint = [-waypoint[0], -waypoint[1]]
                        break
                    case 270:
                        waypoint = [waypoint[1], -waypoint[0]]
                        break
                }
                break
            case 'F':
                pos = [pos[0] + (waypoint[0] * b), pos[1] + (waypoint[1] * b)]
        }
    })
    return Math.abs(pos[0]) + Math.abs(pos[1])
}


main();
