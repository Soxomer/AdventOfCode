"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var filePath = 'input.txt';
// const filePath = 'test.txt';
fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var mx = getMatrice(data);
    var sum = 0;
    for (var i = 0; i < mx.length; i++) {
        var ligne = mx[i];
        for (var j = 0; j < ligne.length; j++) {
            var cell = ligne[j];
            if (isGear(cell[0])) {
                var adjacents = getAdjacents(mx, { x: i, y: j });
                if (adjacents.length === 2) {
                    sum += adjacents.reduce(function (a, b) { return Number(a) * Number(b); }, 1);
                }
            }
        }
    }
    console.log(sum);
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
var getNumberOfAdjacent = function (mx, cell) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    var hautGauche = (_b = (_a = mx[cell.x - 1]) === null || _a === void 0 ? void 0 : _a[cell.y - 1]) === null || _b === void 0 ? void 0 : _b[0];
    var haut = (_d = (_c = mx[cell.x - 1]) === null || _c === void 0 ? void 0 : _c[cell.y]) === null || _d === void 0 ? void 0 : _d[0];
    var hautDroite = (_f = (_e = mx[cell.x - 1]) === null || _e === void 0 ? void 0 : _e[cell.y + 1]) === null || _f === void 0 ? void 0 : _f[0];
    var bas = (_h = (_g = mx[cell.x + 1]) === null || _g === void 0 ? void 0 : _g[cell.y]) === null || _h === void 0 ? void 0 : _h[0];
    var gauche = (_k = (_j = mx[cell.x]) === null || _j === void 0 ? void 0 : _j[cell.y - 1]) === null || _k === void 0 ? void 0 : _k[0];
    var droite = (_m = (_l = mx[cell.x]) === null || _l === void 0 ? void 0 : _l[cell.y + 1]) === null || _m === void 0 ? void 0 : _m[0];
    var basGauche = (_p = (_o = mx[cell.x + 1]) === null || _o === void 0 ? void 0 : _o[cell.y - 1]) === null || _p === void 0 ? void 0 : _p[0];
    var basDroite = (_r = (_q = mx[cell.x + 1]) === null || _q === void 0 ? void 0 : _q[cell.y + 1]) === null || _r === void 0 ? void 0 : _r[0];
    var adjacents = 0;
    // invalide les cases adjacentes qui compose un seul chiffre qu'un chiffre    
    //haut
    if (isNumber(haut) && isNumber(hautDroite)) {
        hautDroite = undefined;
    }
    if (isNumber(haut) && isNumber(hautGauche)) {
        hautGauche = undefined;
    }
    //bas
    if (isNumber(bas) && isNumber(basDroite)) {
        basDroite = undefined;
    }
    if (isNumber(bas) && isNumber(basGauche)) {
        basGauche = undefined;
    }
    if (hautGauche)
        adjacents++;
    if (haut)
        adjacents++;
    if (hautDroite)
        adjacents++;
    if (basGauche)
        adjacents++;
    if (bas)
        adjacents++;
    if (basDroite)
        adjacents++;
    if (gauche)
        adjacents++;
    if (droite)
        adjacents++;
    return adjacents;
};
var getAdjacents = function (mx, cell) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    var coordonnes = {
        hautGauche: { x: cell.x - 1, y: cell.y - 1 },
        haut: { x: cell.x - 1, y: cell.y },
        hautDroite: { x: cell.x - 1, y: cell.y + 1 },
        gauche: { x: cell.x, y: cell.y - 1 },
        droite: { x: cell.x, y: cell.y + 1 },
        basGauche: { x: cell.x + 1, y: cell.y - 1 },
        bas: { x: cell.x + 1, y: cell.y },
        basDroite: { x: cell.x + 1, y: cell.y + 1 },
    };
    var hautGauche = (_b = (_a = mx[coordonnes.hautGauche.x]) === null || _a === void 0 ? void 0 : _a[coordonnes.hautGauche.y]) === null || _b === void 0 ? void 0 : _b[0];
    var haut = (_d = (_c = mx[coordonnes.haut.x]) === null || _c === void 0 ? void 0 : _c[coordonnes.haut.y]) === null || _d === void 0 ? void 0 : _d[0];
    var hautDroite = (_f = (_e = mx[coordonnes.hautDroite.x]) === null || _e === void 0 ? void 0 : _e[coordonnes.hautDroite.y]) === null || _f === void 0 ? void 0 : _f[0];
    var gauche = (_h = (_g = mx[coordonnes.gauche.x]) === null || _g === void 0 ? void 0 : _g[coordonnes.gauche.y]) === null || _h === void 0 ? void 0 : _h[0];
    var droite = (_k = (_j = mx[coordonnes.droite.x]) === null || _j === void 0 ? void 0 : _j[coordonnes.droite.y]) === null || _k === void 0 ? void 0 : _k[0];
    var basGauche = (_m = (_l = mx[coordonnes.basGauche.x]) === null || _l === void 0 ? void 0 : _l[coordonnes.basGauche.y]) === null || _m === void 0 ? void 0 : _m[0];
    var bas = (_p = (_o = mx[coordonnes.bas.x]) === null || _o === void 0 ? void 0 : _o[coordonnes.bas.y]) === null || _p === void 0 ? void 0 : _p[0];
    var basDroite = (_r = (_q = mx[coordonnes.basDroite.x]) === null || _q === void 0 ? void 0 : _q[coordonnes.basDroite.y]) === null || _r === void 0 ? void 0 : _r[0];
    var adjacents = new Set();
    // check chiffre haut
    if (isNumber(hautDroite)) {
        // console.log('hautDroite', hautDroite);
        adjacents.add(getEntireString(mx, coordonnes.hautDroite));
    }
    if (isNumber(haut)) {
        // log('haut', haut);
        adjacents.add(getEntireString(mx, coordonnes.haut));
    }
    if (isNumber(hautGauche)) {
        // console.log('hautGauche', hautGauche);
        adjacents.add(getEntireString(mx, coordonnes.hautGauche));
    }
    // check chiffre bas
    if (isNumber(basDroite)) {
        // console.log('basDroite', basDroite);
        adjacents.add(getEntireString(mx, coordonnes.basDroite));
    }
    if (isNumber(bas)) {
        // console.log('bas', bas);
        adjacents.add(getEntireString(mx, coordonnes.bas));
    }
    if (isNumber(basGauche)) {
        // console.log('basGauche', basGauche);
        adjacents.add(getEntireString(mx, coordonnes.basGauche));
    }
    // check chiffre gauche
    if (isNumber(gauche)) {
        // console.log('gauche', gauche);
        adjacents.add(getEntireString(mx, coordonnes.gauche));
    }
    // check chiffre droite
    if (isNumber(droite)) {
        // console.log('droite', droite);
        adjacents.add(getEntireString(mx, coordonnes.droite));
    }
    // log(adjacents)
    // log(adjacents.size)
    // log(adjacents.values())
    // log(Array.from(adjacents))
    return Array.from(adjacents);
};
var getEntireString = function (mx, cell) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var x = cell.x, y = cell.y;
    var string = '';
    string += (_b = (_a = mx[x]) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[0];
    // log("startS", [string])
    while (isNumber((_d = (_c = mx[x]) === null || _c === void 0 ? void 0 : _c[y]) === null || _d === void 0 ? void 0 : _d[0])) {
        y--;
        if (y < 0 || !isNumber((_f = (_e = mx[x]) === null || _e === void 0 ? void 0 : _e[y]) === null || _f === void 0 ? void 0 : _f[0]))
            break;
        string = ((_h = (_g = mx[x]) === null || _g === void 0 ? void 0 : _g[y]) === null || _h === void 0 ? void 0 : _h[0]) + string;
        // log(string)
    }
    y = cell.y;
    while (isNumber((_k = (_j = mx[x]) === null || _j === void 0 ? void 0 : _j[y]) === null || _k === void 0 ? void 0 : _k[0])) {
        y++;
        if (y >= ((_l = mx[x]) === null || _l === void 0 ? void 0 : _l.length) || !isNumber((_o = (_m = mx[x]) === null || _m === void 0 ? void 0 : _m[y]) === null || _o === void 0 ? void 0 : _o[0]))
            break;
        string = string + ((_q = (_p = mx[x]) === null || _p === void 0 ? void 0 : _p[y]) === null || _q === void 0 ? void 0 : _q[0]);
    }
    // log("endS", [string])
    return string;
};
var isGear = function (cell) {
    return cell === '*';
};
var isNumber = function (cell) {
    return !isNaN(parseInt(cell));
};
