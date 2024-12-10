const fs = require('fs')
const input = fs.readFileSync("input.txt",'utf-8')
let arrBlocks = input.match(/.{2}|./g)


let disk = []
for (let i = 0; i < arrBlocks.length; i++) {
    let [files,space] = arrBlocks[i].split("");
    for (let j = 0; j < files; j++) {
        disk.push([i])
    }
    
    for (let j = 0; j < space; j++) {
        disk.push(["."])
    }
}

let indexLastMoved = disk.length-1;
for (let i = 0; i < disk.length; i++) {
    if (disk[i][0]===".") {
       while(indexLastMoved>i){
        let swapElt = disk[indexLastMoved][0]
        if (swapElt===".") {
            indexLastMoved--
            continue
        }else{
            disk[indexLastMoved][0]="."
            disk[i][0]=swapElt
            indexLastMoved--
            break
        }
       }
    }
}

let checksum = 0
for (let i = 0; i < disk.length; i++) {
    if (disk[i][0]===".") break
    checksum += i * disk[i][0]
    
}
console.log(disk);
console.log(checksum);
