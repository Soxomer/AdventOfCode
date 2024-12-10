const fs = require('fs')

const input = fs.readFileSync("input.txt","utf-8")

const mulRegex = /mul\(\d+,\d+\)/g
const digitsRegex = /\d+/g

const filteredInput= input.matchAll(mulRegex)

let sum =0

for (const mul of filteredInput) {    
    [d1,d2] = mul[0].matchAll(digitsRegex).map(v=>Number(v[0]))
    sum += d1*d2
}

console.log(sum);
