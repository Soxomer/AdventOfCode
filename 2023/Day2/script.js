"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var console_1 = require("console");
//12 red cubes, 13 green cubes, and 14 blue cubes
var RED_CUBE = 12;
var GREEN_CUBE = 13;
var BLUE_CUBE = 14;
var combinaisons = [];
var fillData = function (arrayToParse) {
    arrayToParse.forEach(function (line) {
        line = line.filter(function (e) { return e.trim() !== ''; });
        line = line.map(function (e) { return e.trim(); });
        var gameLine = line[0], rest = line[1], qsdsq = line.slice(2);
        var gameLine = line[0];
        var gameId = parseInt(gameLine.split(" ")[1]);
        var productLine = 0;
        var minRed = 0;
        var minGreen = 0;
        var minBlue = 0;
        for (var i = 0; i < rest.length; i++) {
            var element = rest[i];
            var _a = element.split(" "), nbrCubes = _a[0], color = _a[1];
            switch (color) {
                case 'red':
                    minRed = Math.max(minRed, parseInt(nbrCubes));
                    break;
                case 'green':
                    minGreen = Math.max(minGreen, parseInt(nbrCubes));
                    break;
                case 'blue':
                    minBlue = Math.max(minBlue, parseInt(nbrCubes));
                    break;
                default:
                    console.log("etto");
                    break;
            }
        }
        productLine = minRed * minGreen * minBlue;
        combinaisons.push(productLine);
    });
};
// data shape : Game 1: 12 blue; 2 green, 13 blue, 19 red; 13 red, 3 green, 14 blue
var data = fs.readFileSync('input.txt', 'utf8');
var cleanData = [];
data.split('\n').forEach(function (line) {
    cleanData.push(line.replace(/(,|:)/g, ';').split(';'));
});
console.log(cleanData);
fillData(cleanData);
var sumIds = combinaisons.reduce(function (a, b) { return a + b; }, 0);
(0, console_1.log)(sumIds);
