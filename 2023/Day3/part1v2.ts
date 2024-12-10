
import { log } from 'console';
import * as fs from 'fs';

const filePath = 'input.txt';
// const filePath = 'test.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let sum = 0;
    const mx = getMatrice(data)
    // log(mx)

    for (let i = 0; i < mx.length; i++) {
        const ligne = mx[i];
        for (let j = 0; j < ligne.length; j++) {
            const cell = ligne[j]
            // log(cell)
            if (isNumber(cell[0])) {
                let hasSymbolAdjacent = checkAdjacentGroupe(mx, { x: i, y: j })
                if (hasSymbolAdjacent) {
                    let number = getLongeurGroupe(mx, { x: i, y: j })
                    log(number)
                    sum += parseInt(number);
                }
            }
        }
    }
    log(sum)
});

export const getMatrice = (data: String) => {
    // const lines = data.split('/n')
    const lines = data.split("\n").map(e => e.trim())
    // log(lines)
    const matrice: string[][][] = [];
    lines.forEach((line) => {
        let l: string[][] = []
        let iter = 0;
        while (iter < line.length) {
            let element: string = line[iter]
            l.push([element])
            iter++;
        }
        matrice.push(l)
    })
    return matrice;
}

const checkAdjacent = (mx: string[][][], cell: { x: number, y: number }) => {
    let hasSymbolAdjacent = false;
    if (!isNumber(mx[cell.x]?.[cell.y]?.[0])) return false;
    // check gauche et droite
    const gauche = mx[cell.x]?.[cell.y - 1]?.[0]  // si undefined, on est au bord
    const droite = mx[cell.x]?.[cell.y + 1]?.[0]  // si undefined, on est au bord

    log(gauche, isSymbol(gauche), droite, isSymbol(droite))

    if (gauche && isSymbol(gauche)) {
        log('SymbolGauche')
        return true;
    }
    if (droite && isSymbol(droite)) {
        log('SymbolDroite')
        return true;
    }

    // check 3 au dessus
    const hautGauche = mx[cell.x - 1]?.[cell.y - 1]?.[0]  // si undefined, on est au bord
    const haut = mx[cell.x - 1]?.[cell.y]?.[0]  // si undefined, on est au bord
    const hautDroite = mx[cell.x - 1]?.[cell.y + 1]?.[0]  // si undefined, on est au bord
    // log(hautGauche, isSymbol(hautGauche), haut, isSymbol(haut), hautDroite, isSymbol(hautDroite))
    if (hautGauche && isSymbol(hautGauche)) {
        // log('SymbolHautGauche')
        return true;
    }
    if (haut && isSymbol(haut)) {
        // log('SymbolHaut')
        return true;
    }
    if (hautDroite && isSymbol(hautDroite)) {
        // log('SymbolHautDroite')
        return true;
    }

    // check 3 en dessous
    const basGauche = mx[cell.x + 1]?.[cell.y - 1]?.[0]  // si undefined, on est au bord
    const bas = mx[cell.x + 1]?.[cell.y]?.[0]  // si undefined, on est au bord
    const basDroite = mx[cell.x + 1]?.[cell.y + 1]?.[0]  // si undefined, on est au bord
    // log(basGauche, isSymbol(basGauche), bas, isSymbol(bas), basDroite, isSymbol(basDroite))
    if (basGauche && isSymbol(basGauche)) {
        // log('SymbolBasGauche')
        return true;
    }
    if (bas && isSymbol(bas)) {
        // log('SymbolBas')
        return true;
    }
    if (basDroite && isSymbol(basDroite)) {
        // log('SymbolBasDroite')
        return true;
    }

    return false;
}

const isSymbol = (s: string): boolean => {
    const regexSymbols = /(?!\.)(\W|_)/g
    // log(`${s} : ${regexSymbols.test(s)}`)
    return regexSymbols.test(s)
}

const isNumber = (s: string): boolean => {
    const regexSymbols = /(\d)/g
    // log(`${s} : ${regexSymbols.test(s)}`)
    return regexSymbols.test(s)
}

const checkAdjacentGroupe = (mx: string[][][], cell: { x: number, y: number }) => {
    let [x, y] = [cell.x, cell.y]
    let cellule = mx[x][y];
    let hasSymbolAdjacent = false;

    // check adjacent droite
    while (isNumber(cellule?.[0]) && !hasSymbolAdjacent) {
        log(cellule)
        hasSymbolAdjacent = checkAdjacent(mx, { x, y })
        cellule = mx[x][y++];
    }

    [x, y] = [cell.x, cell.y]
    cellule = mx[x][y];

    // check adjacent gauche
    while (isNumber(cellule?.[0]) && !hasSymbolAdjacent) {
        log(cellule)
        hasSymbolAdjacent = checkAdjacent(mx, { x, y })
        cellule = mx[x][y--];
    }

    log(hasSymbolAdjacent)
    return hasSymbolAdjacent;
}

const getLongeurGroupe = (mx: string[][][], cell: { x: number, y: number }) => {

    if (!isStartOfGroupe(mx, cell)) return '0';

    let number = '';
    let [x, y] = [cell.x, cell.y]

    // check adjacent droite
    while (isNumber(mx[x]?.[y]?.[0])) {
        // log(cellule)
        // log(mx[x][y])
        number = number.concat(mx[x][y++][0]);
    }

    return number;
}


const isStartOfGroupe = (mx: string[][][], cell: { x: number, y: number }) => {
    let [x, y] = [cell.x, cell.y]
    // pas un nombre
    if (!isNumber(mx[x]?.[y]?.[0])) return false;
    // nombre && precedent est un nombre
    if (isNumber(mx[x]?.[y - 1]?.[0])) return false;
    // nombre && precedent est pas un nombre
    return true;

}