"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var fs = require("fs");
var content = fs.readFileSync('test.txt', 'utf-8');
var lines = content.split('\n').map(function (line) {
    return line.split(":");
});
var map = new Map();
lines.forEach(function (line) {
    map.set(parseInt(line[0].split(" ").filter(function (e) { return e != ""; })[1]), line[1].split("|").map(function (item) {
        return item.split(" ").map(function (item) {
            item.trim();
            return parseInt(item);
        }).filter(function (item) {
            return !isNaN(item);
        });
    }));
});
(0, console_1.log)(map);
var occ = new Map();
map.forEach(function (value, key) {
    var matches = 0;
    occ.set(key, [key]);
    value[1].forEach(function (item) {
        if (value[0].includes(item)) {
            matches++;
        }
    });
    for (var i = 1; i <= matches; i++) {
        console.log("key + i ", key + i);
        if (occ.has(key + i)) {
            var arr = occ.get(key);
            arr.push(key + i);
            occ.set(key, arr);
        }
        else {
            occ.set(key + i, []);
        }
    }
});
var allTickets = [];
occ.forEach(function (value, key) {
    allTickets.push.apply(allTickets, value);
});
console.log("length", allTickets.length);
console.log(allTickets);
allTickets.forEach(function (value) {
    allTickets.push.apply(allTickets, occ.get(value));
});
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
function getPoints(key) {
    if (key == 0) {
        return 0;
    }
    var result = 1;
    for (var i = 0; i < key - 1; i++) {
        result *= 2;
    }
    return result;
}
234534;
