const util = require('./util.js')

const today = 4
const requiredFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid']

async  function main() {
    const passwords = util.getInputFromFile(today)
        .split('\n\n')

    var answers = solve(passwords)
    console.log("Part 1: " + answers[0])
    console.log("Part 2: " + answers[1])
}

function solve(passwords) {
    var part1=0,part2=0

    passwords.forEach( password => {
        var fields = new Map(
            password
                .replaceAll("\n", " ")
                .split(" ")
                .map(obj => obj.split(":"))
        )
            
        var isValid = requiredFields.every(required => fields.has(required))
        
        if (isValid) {
            // Enough for Part 1
            part1++

            // validating fields for Part 2
            part2 += !!(
                   fields.get('byr').match(/^(19[2-9][0-9]|200[1-2])$/) // between incl. 1920 and 2002
                && fields.get('iyr').match(/^20(1[0-9]|20)$/)           // between incl. 2010 and 2020
                && fields.get('eyr').match(/^20(2[0-9]|30)$/)           // between incl. 2020 and 2030
                && fields.get('hgt').match(/^(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)$/) // between incl. 150cm and 193cm or 59in and 76in
                && fields.get('hcl').match(/^#[0-9a-f]{6}$/)            // Hex Color
                && fields.get('ecl').match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) // One of these
                && fields.get('pid').match(/^[0-9]{9}$/))               // Nine digit number with padding zeroes
        }
    })
    return [part1, part2]
}

main();