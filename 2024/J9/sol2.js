const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");
let arrBlocks = input.match(/.{2}|./g);

let disk = [];
for (let i = 0; i < arrBlocks.length; i++) {
  let [files, space] = arrBlocks[i].split("");
  disk.push([i, Number(files)]);
  if (space && space > 0) disk.push([".", Number(space)]);
}
console.log(disk);

for (let toMove = disk.length - 1; toMove >= 0; toMove--) {
  if (disk[toMove][0] !== ".") {
    for (let toFill = 0; toFill < disk.length; toFill++) {
      if (toFill > toMove) break;
      if (disk[toFill][0] === ".") {
        if (disk[toFill][1] >= disk[toMove][1]) {
          let restSpace = disk[toFill][1] - disk[toMove][1];
          let newToMove = [".", disk[toMove][1]];
          if (restSpace === 0) {
            disk.splice(toFill, 1, disk[toMove]);
            disk[toMove] = newToMove;
          } else {
            disk.splice(toFill, 1, disk[toMove], [".", restSpace]);
            disk[++toMove] = newToMove;
          }

          //check if moving spaces creates consecutive spaces and aggregate
          if (disk[toMove + 1]?.[0] === ".") {
            disk.splice(toMove, 2, [
              ".",
              disk[toMove][1] + disk[toMove + 1][1],
            ]);
          }

          if (disk[toMove - 1][0] === ".") {
            disk.splice(toMove - 1, 2, [
              ".",
              disk[toMove - 1][1] + disk[toMove][1],
            ]);
          }
          break;
        }
      }
    }
  }
}

let checksum = 0;
let index = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i][0] === ".") {
    index += disk[i][1];
    continue;
  }
  for (let j = 0; j < disk[i][1]; j++) {
    checksum += disk[i][0] * index;
    index++;
  }
}
console.log(disk);
console.log(checksum);
