import * as fs from 'fs';
import { log } from 'console';

//12 red cubes, 13 green cubes, and 14 blue cubes
const RED_CUBE = 12;
const GREEN_CUBE = 13;
const BLUE_CUBE = 14;

const mapOfRed = new Map<number, number>();
const mapOfGreen = new Map<number, number>();
const mapOfBlue = new Map<number, number>();
const combinaisons: Array<number> = [];

const fillData = (arrayToParse: Array<String[]>) => {
    arrayToParse.forEach((line) => {
        // log("start g",g);
        line = line.filter((e) => e.trim() !== '');
        // log("after filter",g);
        line = line.map((e) => e.trim());
        // log("after map",g);
        let sumOfBlue = 0;
        let sumOfGreen = 0;
        let sumOfRed = 0;
        const [gameLine,...rest] = line 
        const gameId = parseInt(gameLine.split(" ")[1])    
        let isValid = true;
        rest.forEach((element) => {
            const [nbrCubes, color] = element.split(" ")
            switch (color) {
                case 'red':
                    // sumOfRed += parseInt(nbrCubes);
                    if (parseInt(nbrCubes)>RED_CUBE) isValid= false;
                        break;
                case 'green':
                    if (parseInt(nbrCubes)>GREEN_CUBE) isValid= false;
                    // sumOfGreen += parseInt(nbrCubes);
                    break;
                case 'blue':
                    if (parseInt(nbrCubes)>BLUE_CUBE) isValid= false;
                    // sumOfBlue += parseInt(nbrCubes);
                    break;
                default:console.log("etto");
                    break;
            }
        });
        
    });
}

// data shape : Game 1: 12 blue; 2 green, 13 blue, 19 red; 13 red, 3 green, 14 blue
const data = fs.readFileSync('input.txt', 'utf8');


const cleanData: Array<String[]> = [];
data.split('\n').forEach((line) => {
    cleanData.push(line.replace(/(,|:)/g, ';').split(';'))
});

// log(cleanData);
fillData(cleanData);
log(combinaisons);
const sumIds = combinaisons.reduce((a, b) => a + b, 0);
log(sumIds);
log(mapOfRed);
log(mapOfGreen);
log(mapOfBlue);

log(cleanData);

while
for (let i = 0; i >= cleanData.length; i++) {
    for (let j = i+1; j < cleanData.length; j++) {
        for (let k = j+1; k < cleanData.length; k++) {
  
        }
    }
}