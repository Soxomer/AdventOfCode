import * as fs from 'fs';
import { log } from 'console';

//12 red cubes, 13 green cubes, and 14 blue cubes
const RED_CUBE = 12;
const GREEN_CUBE = 13;
const BLUE_CUBE = 14;

const combinaisons: Array<number> = [];

const fillData = (arrayToParse: Array<String[]>) => {
    arrayToParse.forEach((line) => {
        line = line.filter((e) => e.trim() !== '');

        line = line.map((e) => e.trim());

        const [gameLine, ...rest] = line

        const gameId = parseInt(gameLine.split(" ")[1])
        let productLine = 0;
        let minRed = 0;
        let minGreen = 0;
        let minBlue = 0;
        for (let i = 0; i < rest.length; i++) {
            const element = rest[i];
            const [nbrCubes, color] = element.split(" ")
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
                default: console.log("etto");
                    break;
            }
        }
        productLine = minRed * minGreen * minBlue;
        combinaisons.push(productLine);
    });
}

// data shape : Game 1: 12 blue; 2 green, 13 blue, 19 red; 13 red, 3 green, 14 blue
const data = fs.readFileSync('input.txt', 'utf8');

const cleanData: Array<String[]> = [];
data.split('\n').forEach((line) => {
    cleanData.push(line.replace(/(,|:)/g, ';').split(';'))
});
console.log(cleanData);
fillData(cleanData);
const sumIds = combinaisons.reduce((a, b) => a + b, 0);
log(sumIds);