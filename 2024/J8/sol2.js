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

  let antiNodes = [];
  while (true) {
    x1 -= diffX;
    y1 -= diffY;
    if (isOutOfBounds([x1,y1])) break
    antiNodes.push([x1, y1]);
  }

  while (true) {
    x2 += diffX;
    y2 += diffY;
    if (isOutOfBounds([x2,y2])) break
    antiNodes.push([x2, y2]);
  }
  return antiNodes;
}

function isOutOfBounds(antiNode) {  
  let [x, y] = antiNode;
  return x < 0 || y < 0 || x >= m.length || y >= m[0].length;
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

mapAntenne.forEach((value, key) => {
  for (let i = 0; i < value.length; i++) {
    anitnodesSet.add(value[i].toString())
    for (let j = i + 1; j < value.length; j++) {
      anitnodesSet.add(value[j].toString())
      let antinodes = getAntinodesOfTuple(value[i], value[j]);
      antinodes.forEach(an=>anitnodesSet.add(an.toString()))
      }
  }
});
console.log(anitnodesSet);
