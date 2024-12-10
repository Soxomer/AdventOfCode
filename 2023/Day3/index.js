"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var fs = require("fs");
var filePath = 'test.txt';
// const filePath = 'test.txt';
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var mx = getMatrice(data);
    (0, console_1.log)(mx);
    for (var i = 0; i < mx[0].length; i++) {
        var element = mx[0][i];
        (0, console_1.log)(element);
    }
});
var getMatrice = function (data) {
    // const lines = data.split('/n')
    var lines = data.split("\n").map(function (e) { return e.trim(); });
    (0, console_1.log)(lines);
    var matrice = [];
    lines.forEach(function (line) {
        var l = [];
        var subS = [];
        var iter = 0;
        while (iter < line.length) {
            var element = line[iter];
            // si c'est pas un nombre
            if (isNaN(parseInt(element))) {
                // vide suite nombre s'il y a
                if (subS.length > 0) {
                    l.push([subS.join('')]);
                    subS = [];
                }
                l.push([element]);
            } // si c'est un nombre
            else {
                subS.push(element);
            }
            iter++;
        }
        matrice.push(l);
    });
    return matrice;
};
