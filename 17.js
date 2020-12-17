const util = require('./util.js')

const TODAY = 17

const ITERATIONS = 6,
    INACTIVE = '.', ACTIVE = '#'

function main() {
    const ops = util.getInputFromFile(TODAY)
        .split('\n')
        .map(e=>e.split(''))
    
    console.log("Part 1: " + part1(ops))
    console.log("Part 2: " + part2(ops))
}


function part1(ops) {
    let x_axis = []
    for (let x = 0; x<ops.length+(ITERATIONS*2);x++) {
        let y_axis = []
        for (let y = 0; y<ops.length+(ITERATIONS*2);y++) {
            let z_axis = []
            for (let z = 0; z < ops.length+(ITERATIONS*2);z++) {
                z_axis.push(INACTIVE)
            }
            y_axis.push(z_axis)
        }
        x_axis.push(y_axis)
    }
    
    for (let y = 0; y < ops.length;y++) {
        for (let x = 0; x<ops[y].length; x++) {
            x_axis[ITERATIONS][y + ITERATIONS][x+ITERATIONS] = ops[y][x]
        }
    }

    for(let iteration = 0; iteration < ITERATIONS; iteration++) {
        let working_copy = JSON.parse(JSON.stringify(x_axis))
        for(let z = 0; z < x_axis.length; z++) {
            for(let y = 0; y < x_axis[z].length; y++) {
                for (let x = 0; x < x_axis[z][y].length; x++) {
                    let neigbours = countNeigbours3(x_axis, x, y, z)
                    if(x_axis[z][y][x] === ACTIVE && (neigbours < 2 ||neigbours > 3)){
                        working_copy[z][y][x] = INACTIVE
                    } else if(x_axis[z][y][x] === INACTIVE && neigbours === 3) {
                        working_copy[z][y][x] = ACTIVE
                    }
                }
            }
        }
        x_axis = working_copy
    }

    return x_axis.flat(2).reduce((a, e)=> a+=(e===ACTIVE), 0);

}
function countNeigbours3(ops, pos_x, pos_y, pos_z) {
    let result = 0
    for(let z = -1; z <= 1; z++) {
        for(let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if(x != 0 || y != 0 || z != 0) {
                    if (ops[pos_z+z] && ops[pos_z+z][pos_y+y] && ops[pos_z+z][pos_y+y][pos_x+x] === ACTIVE) {
                        result++
                    }
                }
            }
        }
    }
    return result
}

function countNeigbours4(ops, pos_x, pos_y, pos_z, pos_w) {
    let result = 0
    for(let w = -1; w <= 1; w++) {
        for(let z = -1; z <= 1; z++) {
            for(let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    if(x != 0 || y != 0 || z != 0 || w != 0) {
                        if (   ops[pos_w+w] 
                            && ops[pos_w+w][pos_z+z] 
                            && ops[pos_w+w][pos_z+z][pos_y+y] 
                            && ops[pos_w+w][pos_z+z][pos_y+y][pos_x+x] === ACTIVE) {
                                result++
                        }
                    }
                }
            }
        }
    }
    return result
}

function part2(ops) {

    let x_axis = []
    for (let x = 0; x<ops.length + (ITERATIONS*2); x++) {
        let y_axis = []
        for (let y = 0; y<ops.length + (ITERATIONS*2); y++) {
            let z_axis = []
            for (let z = 0; z < ops.length + (ITERATIONS*2); z++) {
                let w_axis = []
                for (let w = 0; w < ops.length + (ITERATIONS*2); w++) {
                    w_axis.push(INACTIVE)
                }
                z_axis.push(w_axis)
            }
            y_axis.push(z_axis)
        }
        x_axis.push(y_axis)
    }
    
    for (let y = 0; y < ops.length;y++) {
        for (let x = 0; x<ops[y].length; x++) {
            x_axis[ITERATIONS][ITERATIONS][y + ITERATIONS][x + ITERATIONS] = ops[y][x]
        }
    }

    for(let iteration = 0; iteration < ITERATIONS; iteration++) {
        let working_copy = JSON.parse(JSON.stringify(x_axis))
        for(let w = 0; w < x_axis.length; w++) {
            for(let z = 0; z < x_axis[w].length; z++) {
                for(let y = 0; y < x_axis[w][z].length; y++) {
                    for (let x = 0; x < x_axis[w][z][y].length; x++) {
                        let neigbours = countNeigbours4(x_axis, x, y, z, w)
                        if(x_axis[w][z][y][x] === ACTIVE && (neigbours < 2 ||neigbours > 3)){
                            working_copy[w][z][y][x] = INACTIVE
                        } else if(x_axis[w][z][y][x] === INACTIVE && neigbours === 3) {
                            working_copy[w][z][y][x] = ACTIVE
                        }
                    }
                }
            }
        }
        x_axis = working_copy
    }

    return x_axis.flat(3).reduce((a, e)=> a+=(e===ACTIVE), 0);
}


main();
