import { match } from 'assert';
import { log } from 'console';
import * as fs from 'fs';
import { get } from 'https';

let content = fs.readFileSync('test.txt', 'utf-8');

let lines = content.split('\n').map((line) => {
    return line.split(":");
});

const map = new Map();
lines.forEach((line) => {
    map.set(parseInt(line[0].split(" ").filter(e => e != "")[1]), line[1].split("|").map((item) => {
        return item.split(" ").map((item) => {
            item.trim();
            return parseInt(item);
        }).filter((item) => {
            return !isNaN(item)
        })
    }
    ));
});

log(map);
const occ: Map<number, number[]> = new Map();
map.forEach((value, key) => {
    let matches = 0;
    occ.set(key, [key]);

    value[1].forEach((item) => {
        if (value[0].includes(item)) {
            matches++;
        }
    });

    for (let i = 1; i <= matches; i++) {
        console.log("key + i ", key + i);
        if (occ.has(key)) {
            let arr = occ.get(key)!;
            arr.push(key + i)
            occ.set(key, arr)
        } else {
            occ.set(key, [key + 1])
        }
    }
});

const allTickets: number[] = []
occ.forEach((value, key) => {
    allTickets.push(...value)
})

console.log("length", allTickets.length);
console.log(allTickets);

allTickets.forEach((value) => {
    allTickets.push(...occ.get(value)!)
})
console.log();

console.log("length", allTickets.length);
console.log(allTickets);
console.log(occ);

// let totalWithBonus = 0;
// allTickets.forEach((value, keys) => {
//     totalWithBonus += occ.get()
// })

// occ.forEach((value, key) => {
//     const arrToAdd = []
//     value.forEach(item => {

//     })
// });


// log(totalCards);


function getPoints(key: number): number {
    if (key == 0) {
        return 0;
    }
    let result = 1;
    for (let i = 0; i < key - 1; i++) {
        result *= 2;
    }
    return result;
}

234534