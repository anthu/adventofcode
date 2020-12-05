const util = require('./util.js')

const TODAY = 5
const ROW_MAX = 127, SEAT_MAX = 7
const BIN_DIR_RIGHT = ["L", "F"]


async  function main() {
    const boardingPasses = util.getInputFromFile(TODAY)
        .split('\n')

    var answers = solve(boardingPasses)
    console.log("Part 1: " + answers[0])
    console.log("Part 2: " + answers[1])
}

const getSeatId = (row, seat) => row * 8 + seat

const binWalk = (str, high, low=0) => {
    str.split('').forEach(r => {
        (BIN_DIR_RIGHT.includes(r)) 
            ? high = low + Math.floor((high - low) / 2) 
            : low = low + Math.ceil((high - low) / 2)
    })
    return high
}

function solve(boardingPasses) {
    var seats = []
    boardingPasses.forEach(pass => {
        let row = binWalk(pass.substring(0, 7), ROW_MAX)
        let seat = binWalk(pass.substring(7), SEAT_MAX)

        let seatId = getSeatId(row, seat)

        seats.push(seatId)
    })
    
    // Part 1: Get highest seen SeatId
    let high = Math.max(...seats)

    // Part 2: Search for missing number between lowest and highest ID
    for (let i = Math.min(...seats) + 1; i < high; i++) {
        if (!seats.includes(i))
            return [high, i]
    }
}

main();