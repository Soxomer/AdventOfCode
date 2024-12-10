
import { log } from 'console';
import * as fs from 'fs';

const filePath = 'test.txt';
// const filePath = 'test.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const mx = getMatrice(data)
    log(mx)

    for (let i = 0; i < mx[0].length; i++) {
        const element = mx[0][i];
        log(element)
    }
});

const getMatrice = (data: String) => {
    // const lines = data.split('/n')
    const lines = data.split("\n").map(e=>e.trim())
    log(lines)
    const matrice: string[][][] = [];
    lines.forEach((line) => {
        let l: string[][] = []
        let subS: string[] = []
        let iter = 0;
        while (iter < line.length) {
            let element: string = line[iter]
            // si c'est pas un nombre
            if (isNaN(parseInt(element))) {
                // vide suite nombre s'il y a
                if (subS.length > 0) {
                    l.push([subS.join('')])
                    subS = []
                }
                l.push([element])
            }// si c'est un nombre
            else {
                subS.push(element)
            }
            iter++;
        }
        matrice.push(l)
    })
    return matrice;
}

