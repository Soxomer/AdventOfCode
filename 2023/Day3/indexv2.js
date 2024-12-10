"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var fs = require("fs");
var filePath = 'input.txt';
// const filePath = 'test.txt';
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var sum = 0;
    var mx = getMatrice(data);
    // log(mx)
    for (var i = 0; i < mx.length; i++) {
        var ligne = mx[i];
        for (var j = 0; j < ligne.length; j++) {
            var cell = ligne[j];
            // log(cell)
            if (isNumber(cell[0])) {
                var hasSymbolAdjacent = checkAdjacentGroupe(mx, { x: i, y: j });
                if (hasSymbolAdjacent) {
                    var number = getLongeurGroupe(mx, { x: i, y: j });
                    (0, console_1.log)(number);
                    sum += parseInt(number);
                }
            }
        }
    }
    (0, console_1.log)(sum);
});
var getMatrice = function (data) {
    // const lines = data.split('/n')
    var lines = data.split("\n").map(function (e) { return e.trim(); });
    // log(lines)
    var matrice = [];
    lines.forEach(function (line) {
        var l = [];
        var iter = 0;
        while (iter < line.length) {
            var element = line[iter];
            l.push([element]);
            iter++;
        }
        matrice.push(l);
    });
    return matrice;
};
var checkAdjacent = function (mx, cell) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var hasSymbolAdjacent = false;
    if (!isNumber((_b = (_a = mx[cell.x]) === null || _a === void 0 ? void 0 : _a[cell.y]) === null || _b === void 0 ? void 0 : _b[0]))
        return false;
    // check gauche et droite
    var gauche = (_d = (_c = mx[cell.x]) === null || _c === void 0 ? void 0 : _c[cell.y - 1]) === null || _d === void 0 ? void 0 : _d[0]; // si undefined, on est au bord
    var droite = (_f = (_e = mx[cell.x]) === null || _e === void 0 ? void 0 : _e[cell.y + 1]) === null || _f === void 0 ? void 0 : _f[0]; // si undefined, on est au bord
    (0, console_1.log)(gauche, isSymbol(gauche), droite, isSymbol(droite));
    if (gauche && isSymbol(gauche)) {
        (0, console_1.log)('SymbolGauche');
        return true;
    }
    if (droite && isSymbol(droite)) {
        (0, console_1.log)('SymbolDroite');
        return true;
    }
    // check 3 au dessus
    var hautGauche = (_h = (_g = mx[cell.x - 1]) === null || _g === void 0 ? void 0 : _g[cell.y - 1]) === null || _h === void 0 ? void 0 : _h[0]; // si undefined, on est au bord
    var haut = (_k = (_j = mx[cell.x - 1]) === null || _j === void 0 ? void 0 : _j[cell.y]) === null || _k === void 0 ? void 0 : _k[0]; // si undefined, on est au bord
    var hautDroite = (_m = (_l = mx[cell.x - 1]) === null || _l === void 0 ? void 0 : _l[cell.y + 1]) === null || _m === void 0 ? void 0 : _m[0]; // si undefined, on est au bord
    // log(hautGauche, isSymbol(hautGauche), haut, isSymbol(haut), hautDroite, isSymbol(hautDroite))
    if (hautGauche && isSymbol(hautGauche)) {
        (0, console_1.log)('SymbolHautGauche');
        return true;
    }
    if (haut && isSymbol(haut)) {
        (0, console_1.log)('SymbolHaut');
        return true;
    }
    if (hautDroite && isSymbol(hautDroite)) {
        (0, console_1.log)('SymbolHautDroite');
        return true;
    }
    // check 3 en dessous
    var basGauche = (_p = (_o = mx[cell.x + 1]) === null || _o === void 0 ? void 0 : _o[cell.y - 1]) === null || _p === void 0 ? void 0 : _p[0]; // si undefined, on est au bord
    var bas = (_r = (_q = mx[cell.x + 1]) === null || _q === void 0 ? void 0 : _q[cell.y]) === null || _r === void 0 ? void 0 : _r[0]; // si undefined, on est au bord
    var basDroite = (_t = (_s = mx[cell.x + 1]) === null || _s === void 0 ? void 0 : _s[cell.y + 1]) === null || _t === void 0 ? void 0 : _t[0]; // si undefined, on est au bord
    // log(basGauche, isSymbol(basGauche), bas, isSymbol(bas), basDroite, isSymbol(basDroite))
    if (basGauche && isSymbol(basGauche)) {
        (0, console_1.log)('SymbolBasGauche');
        return true;
    }
    if (bas && isSymbol(bas)) {
        (0, console_1.log)('SymbolBas');
        return true;
    }
    if (basDroite && isSymbol(basDroite)) {
        (0, console_1.log)('SymbolBasDroite');
        return true;
    }
    return false;
};
var isSymbol = function (s) {
    var regexSymbols = /(?!\.)(\W|_)/g;
    // log(`${s} : ${regexSymbols.test(s)}`)
    return regexSymbols.test(s);
};
var isNumber = function (s) {
    var regexSymbols = /(\d)/g;
    // log(`${s} : ${regexSymbols.test(s)}`)
    return regexSymbols.test(s);
};
var checkAdjacentGroupe = function (mx, cell) {
    var _a;
    var _b = [cell.x, cell.y], x = _b[0], y = _b[1];
    var cellule = mx[x][y];
    var hasSymbolAdjacent = false;
    // check adjacent droite
    while (isNumber(cellule === null || cellule === void 0 ? void 0 : cellule[0]) && !hasSymbolAdjacent) {
        (0, console_1.log)(cellule);
        hasSymbolAdjacent = checkAdjacent(mx, { x: x, y: y });
        cellule = mx[x][y++];
    }
    _a = [cell.x, cell.y], x = _a[0], y = _a[1];
    cellule = mx[x][y];
    // check adjacent gauche
    while (isNumber(cellule === null || cellule === void 0 ? void 0 : cellule[0]) && !hasSymbolAdjacent) {
        (0, console_1.log)(cellule);
        hasSymbolAdjacent = checkAdjacent(mx, { x: x, y: y });
        cellule = mx[x][y--];
    }
    (0, console_1.log)(hasSymbolAdjacent);
    return hasSymbolAdjacent;
};
var getLongeurGroupe = function (mx, cell) {
    var _a, _b;
    if (!isStartOfGroupe(mx, cell))
        return '0';
    var number = '';
    var _c = [cell.x, cell.y], x = _c[0], y = _c[1];
    // check adjacent droite
    while (isNumber((_b = (_a = mx[x]) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[0])) {
        // log(cellule)
        // log(mx[x][y])
        number = number.concat(mx[x][y++][0]);
    }
    return number;
};
var isStartOfGroupe = function (mx, cell) {
    var _a, _b, _c, _d;
    var _e = [cell.x, cell.y], x = _e[0], y = _e[1];
    // pas un nombre
    if (!isNumber((_b = (_a = mx[x]) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[0]))
        return false;
    // nombre && precedent est un nombre
    if (isNumber((_d = (_c = mx[x]) === null || _c === void 0 ? void 0 : _c[y - 1]) === null || _d === void 0 ? void 0 : _d[0]))
        return false;
    // nombre && precedent est pas un nombre
    return true;
};
