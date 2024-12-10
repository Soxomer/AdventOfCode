
import { log } from 'console';
import * as fs from 'fs';

const filePath = 'input.txt';
// const filePath = 'test.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const mx = getMatrice(data)
    let sum = 0;
    for (let i = 0; i < mx.length; i++) {
        const ligne = mx[i];
        for (let j = 0; j < ligne.length; j++) {
            const cell = ligne[j]
            if (isGear(cell[0])) {
                let adjacents = getAdjacents(mx, { x: i, y: j })

                if (adjacents.length === 2) {
                    sum += adjacents.reduce((a, b) => Number(a) * Number(b), 1)
                }
            }
        }
    }
    console.log(sum);
});

const getMatrice = (data: String) => {
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

const getNumberOfAdjacent = (mx: string[][][], cell: { x: number, y: number }) => {
    let hautGauche: string | undefined = mx[cell.x - 1]?.[cell.y - 1]?.[0]
    let haut: string | undefined = mx[cell.x - 1]?.[cell.y]?.[0]
    let hautDroite: string | undefined = mx[cell.x - 1]?.[cell.y + 1]?.[0]
    let bas: string | undefined = mx[cell.x + 1]?.[cell.y]?.[0]
    let gauche: string | undefined = mx[cell.x]?.[cell.y - 1]?.[0]
    let droite: string | undefined = mx[cell.x]?.[cell.y + 1]?.[0]
    let basGauche: string | undefined = mx[cell.x + 1]?.[cell.y - 1]?.[0]
    let basDroite: string | undefined = mx[cell.x + 1]?.[cell.y + 1]?.[0]
    let adjacents = 0;
    // invalide les cases adjacentes qui compose un seul chiffre qu'un chiffre    
    //haut

    if (isNumber(haut) && isNumber(hautDroite)) {
        hautDroite = undefined
    }
    if (isNumber(haut) && isNumber(hautGauche)) {
        hautGauche = undefined
    }
    //bas
    if (isNumber(bas) && isNumber(basDroite)) {
        basDroite = undefined
    }
    if (isNumber(bas) && isNumber(basGauche)) {
        basGauche = undefined
    }

    if (hautGauche) adjacents++;
    if (haut) adjacents++;
    if (hautDroite) adjacents++;
    if (basGauche) adjacents++;
    if (bas) adjacents++;
    if (basDroite) adjacents++;
    if (gauche) adjacents++;
    if (droite) adjacents++;
    return adjacents;
}

const getAdjacents = (mx: string[][][], cell: { x: number, y: number }) => {
    const coordonnes = {
        hautGauche: { x: cell.x - 1, y: cell.y - 1 },
        haut: { x: cell.x - 1, y: cell.y },
        hautDroite: { x: cell.x - 1, y: cell.y + 1 },
        gauche: { x: cell.x, y: cell.y - 1 },
        droite: { x: cell.x, y: cell.y + 1 },
        basGauche: { x: cell.x + 1, y: cell.y - 1 },
        bas: { x: cell.x + 1, y: cell.y },
        basDroite: { x: cell.x + 1, y: cell.y + 1 },
    }

    let hautGauche: string | undefined = mx[coordonnes.hautGauche.x]?.[coordonnes.hautGauche.y]?.[0]
    let haut: string | undefined = mx[coordonnes.haut.x]?.[coordonnes.haut.y]?.[0]
    let hautDroite: string | undefined = mx[coordonnes.hautDroite.x]?.[coordonnes.hautDroite.y]?.[0]
    let gauche: string | undefined = mx[coordonnes.gauche.x]?.[coordonnes.gauche.y]?.[0]
    let droite: string | undefined = mx[coordonnes.droite.x]?.[coordonnes.droite.y]?.[0]
    let basGauche: string | undefined = mx[coordonnes.basGauche.x]?.[coordonnes.basGauche.y]?.[0]
    let bas: string | undefined = mx[coordonnes.bas.x]?.[coordonnes.bas.y]?.[0]
    let basDroite: string | undefined = mx[coordonnes.basDroite.x]?.[coordonnes.basDroite.y]?.[0]
    const adjacents: Set<String> = new Set();
    // check chiffre haut
    if (isNumber(hautDroite)) {
        // console.log('hautDroite', hautDroite);
        adjacents.add(getEntireString(mx, coordonnes.hautDroite))
    }
    if (isNumber(haut)) {
        // log('haut', haut);
        adjacents.add(getEntireString(mx, coordonnes.haut))
    }

    if (isNumber(hautGauche)) {
        // console.log('hautGauche', hautGauche);
        adjacents.add(getEntireString(mx, coordonnes.hautGauche))
    }
    // check chiffre bas
    if (isNumber(basDroite)) {
        // console.log('basDroite', basDroite);
        adjacents.add(getEntireString(mx, coordonnes.basDroite))
    }
    if (isNumber(bas)) {
        // console.log('bas', bas);
        adjacents.add(getEntireString(mx, coordonnes.bas))
    }
    if (isNumber(basGauche)) {
        // console.log('basGauche', basGauche);
        adjacents.add(getEntireString(mx, coordonnes.basGauche))
    }
    // check chiffre gauche
    if (isNumber(gauche)) {
        // console.log('gauche', gauche);
        adjacents.add(getEntireString(mx, coordonnes.gauche))
    }
    // check chiffre droite
    if (isNumber(droite)) {
        // console.log('droite', droite);
        adjacents.add(getEntireString(mx, coordonnes.droite))
    }
    // log(adjacents)
    // log(adjacents.size)
    // log(adjacents.values())
    // log(Array.from(adjacents))
    return Array.from(adjacents);
}

const getEntireString = (mx: string[][][], cell: { x: number, y: number }) => {
    let { x, y } = cell;
    let string = '';
    string += mx[x]?.[y]?.[0];
    // log("startS", [string])
    while (isNumber(mx[x]?.[y]?.[0])) {
        y--;
        if (y < 0 || !isNumber(mx[x]?.[y]?.[0])) break;
        string = mx[x]?.[y]?.[0] + string;
        // log(string)
    }

    y = cell.y;
    while (isNumber(mx[x]?.[y]?.[0])) {
        y++;
        if (y >= mx[x]?.length || !isNumber(mx[x]?.[y]?.[0])) break;
        string = string + mx[x]?.[y]?.[0];
    }
    // log("endS", [string])
    return string;
}

const isGear = (cell: string) => {
    return cell === '*'
}
const isNumber = (cell: string) => {
    return !isNaN(parseInt(cell))
}
