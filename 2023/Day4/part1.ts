import { log } from 'console';
import * as fs from 'fs';
import { get } from 'https';

let content = fs.readFileSync('input.txt', 'utf-8');

let lines = content.split('\n').map((line) => {
    return line.split(":");
});

const map = new Map();
lines.forEach((line) => {
    
    map.set(line[0].split(" ").filter(e=>e!="")[1], line[1].split("|").map((item) => {
        return item.split(" ").map((item) => {
            item.trim();
            return parseInt(item);
        }).filter((item) => {
            return !isNaN(item)
        })
    }
    ));
});

// log(map);
const points = new Map();

map.forEach((value, key) => {
    let correspedances = 0;
    value[1].forEach((item) => {
        if (value[0].includes(item)) {
            correspedances++;
        }
    });
    points.set(key, getPoints(correspedances));
});
log(points);

let total = 0;
points.forEach((value) => {
    total += value;
});
log(total);


function getPoints(key:number):number{
    if(key == 0){
        return 0;
    }
    let result = 1;
    for (let i = 0; i <key-1; i++) {
        result *= 2;
    }
    return result;
}

