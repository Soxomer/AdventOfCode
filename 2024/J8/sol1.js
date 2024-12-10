const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");

function createMatrix(input) {
  let lines = input.split(/\r\n/);
  let cols = lines.map((v) => v.split(""));
  return cols;
}

function getAntinodesOfTuple(t1, t2) {
  let [x1, y1] = t1;
  let [x2, y2] = t2;

  let diffX = x2 - x1;
  let diffY = y2 - y1;

  let antiN1 = [x1 - diffX, y1 - diffY];
  let antiN2 = [x2 + diffX, y2 + diffY];

  return [antiN1, antiN2];
}

let m = createMatrix(input);
let mapAntenne = new Map();
let anitnodesSet = new Set();
for (let i = 0; i < m.length; i++) {
  for (let j = 0; j < m[0].length; j++) {
    let item = m[i][j];
    if (item !== ".") {
      let antennes = mapAntenne.get(item);
      if (!antennes) {
        mapAntenne.set(item, [[i, j]]);
      } else {
        mapAntenne.get(item).push([i, j]);
      }
    }
  }
}

function isOutOfBounds(antiNode){
 let [x,y] = antiNode
 return x<0 || y<0 || x >= m.length || y >= m[0].length
}

mapAntenne.forEach((value, key) => {
  console.log(value);
  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      console.log(value[i], value[j]);
      let [antiN1, antiN2] = getAntinodesOfTuple(value[i], value[j]);
      if (!isOutOfBounds(antiN1)) anitnodesSet.add(antiN1.toString())
      if (!isOutOfBounds(antiN2)) anitnodesSet.add(antiN2.toString())
    }
  }
  console.log();
});
console.log(anitnodesSet);
