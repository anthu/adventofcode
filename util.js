const https = require('https')
var config = require('./config.json');

const year = 2020

var getInput = (day) => {

    const options = {
        method: "GET",
        hostname: 'adventofcode.com',
        port: 443,
        path: "/" + year + "/day/" + day + "/input",
        headers: {
            Cookie: config.cookie
        }
    }

    return new Promise((resolve, reject) =>  {
        const req = https.request(
            options, 
            (res) => {
                res.on('data', d => resolve(d.toString().trim()))
            }
        )
        req.on('error', reject)
        req.end()
    })
}

var sendAnswer = (day, level, answer) => {
    var data = 'level=' + level + "&answer=" + answer

    const options = {
        method: "POST",
        hostname: 'adventofcode.com',
        port: 443,
        path: "/" + year + "/day/" + day + "/answer",
        headers: {
            Cookie: config.cookie,
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": data.length
        }
    }
    return new Promise((resolve, reject) =>  {
        const req = https.request(
            options, 
            res => {
                res.on('data', d => resolve(d.toString().trim()))
            }
        )
        req.on('error', reject)

        req.write(data)
        req.end()
    })
}

module.exports = {
    getInput,
    sendAnswer
}