const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

function createMatrix(input) {
  let lines = input.split("\r\n");
  return lines.map((l) => l.split("").map(Number));
}

function findNext(current, lastPos) {
  let traks = [];
  let up = [lastPos[0] - 1, lastPos[1]];
  let down = [lastPos[0] + 1, lastPos[1]];
  let right = [lastPos[0], lastPos[1] + 1];
  let left = [lastPos[0], lastPos[1] - 1];

  if (m?.[up[0]]?.[up[1]] === current) traks.push(up);
  if (m?.[down[0]]?.[down[1]] === current) traks.push(down);
  if (m?.[right[0]]?.[right[1]] === current) traks.push(right);
  if (m?.[left[0]]?.[left[1]] === current) traks.push(left);
  return traks;
}

function getAllPaths(current, path, paths) {
  if (current === 9)
    if (!paths.some((p) => p[p.length - 1].toString() === path[path.length - 1].toString())
    ) {
      // avoid different paths with same destination and same start
      paths.push(path);
      return;
    }
  current++;
  let nextPaths = findNext(current, path[path.length - 1]);
  if (nextPaths.length === 0) return;
  for (const pos of nextPaths) {
    let uniquePath = Array.from(path);
    uniquePath.push(pos);
    getAllPaths(current, uniquePath, paths);
  }
}

let m = createMatrix(input);
let allPaths = [];
for (let i = 0; i < m.length; i++) {
  for (let j = 0; j < m[0].length; j++) {
    if (m[i][j] === 0) {
      let paths = [];
      getAllPaths(0, [[i, j]], paths);
      allPaths.push([[i, j], paths.length]);
    }
  }
}

let sum=0
for (const path of allPaths) {
    sum+=path[1]
}

console.log(sum);

