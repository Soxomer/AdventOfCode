"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var fs = require("fs");
var content = fs.readFileSync('input.txt', 'utf-8');
var lines = content.split('\n').map(function (line) {
    return line.split(":");
});
var map = new Map();
lines.forEach(function (line) {
    map.set(line[0].split(" ").filter(function (e) { return e != ""; })[1], line[1].split("|").map(function (item) {
        return item.split(" ").map(function (item) {
            item.trim();
            return parseInt(item);
        }).filter(function (item) {
            return !isNaN(item);
        });
    }));
});
// log(map);
var points = new Map();
map.forEach(function (value, key) {
    var correspedances = 0;
    value[1].forEach(function (item) {
        if (value[0].includes(item)) {
            correspedances++;
        }
    });
    points.set(key, getPoints(correspedances));
});
(0, console_1.log)(points);
var total = 0;
points.forEach(function (value) {
    total += value;
});
(0, console_1.log)(total);
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
