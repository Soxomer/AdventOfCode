const fs = require("fs");

// Lecture du fichier input.txt
let input = fs.readFileSync("input.txt", "utf8");

input = input.split(/\s+/).map(Number);

const leftList = input.filter((_, i) => i % 2 == 0);
const rightList = input.filter((_, i) => i % 2 !== 0);

const map = new Map()

rightList.forEach((val)=>{
    if (!map.has(val)) {
        map.set(val,1)
    }else{
        map.set(val,map.get(val)+1)
    }
})

let similarityScore=0

leftList.forEach((val)=>{
    if(!map.has(val)) return;
    let occ = map.get(val)
    similarityScore += val * occ
})

console.log(similarityScore);


