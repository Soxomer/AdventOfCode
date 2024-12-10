const fs = require("fs");

// Lecture du fichier input.txt
let input = fs.readFileSync("input.txt", "utf8");

input = input.split(/\s+/).map(Number)

const list1 = input.filter((_,i)=> i%2==0)
const list2 = input.filter((_,i)=> i%2!=0)

const sortedList1 = list1.sort((a,b)=>a-b)
const sortedList2 = list2.sort((a, b) => a - b);
let distance = 0

sortedList1.forEach((v,i)=>{
    distance+= Math.abs(v -sortedList2[i])
})



console.log(distance);
