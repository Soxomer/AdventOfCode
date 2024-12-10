const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");

let directions = [
  ["-", "."],
  [".", "+"],
  ["+", "."],
  [".", "-"],
]; // up,right,down,left

function buildMatrix(text) {
  let lines = text.split(/\r\n/);
  let cells = lines.map((v) => v.split(""));
  return cells;
}

function getGuardPosition(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === "^") return [i, j];
    }
  }
}

function getNextPosition(
  matrix,
  currentPosition,
  dirIndex,
  zoneParcourue,
  coinParcouru,
  newObstacles
) {
  let [x, y] = currentPosition;
  zoneParcourue.add(x + "|" + y);
  let operation = directions[dirIndex];

  [x, y] = getPos(x, y, operation);

  // out of map
  if (matrix[x]?.[y] === undefined) return undefined;
  // collision
  else if (matrix[x]?.[y] === "#") {
    [x, y] = currentPosition;
    coinParcouru.add(x + "|" + y);
    dirIndex = ++dirIndex % 4;
    operation = directions[dirIndex];
    [x, y] = getPos(x, y, operation);
    if (matrix[x][y] === undefined) return undefined;
  }

  // possible loop
  if (zoneParcourue.has(x + "|" + y)) {
    let indexCopy = dirIndex;
    let possibleDirIndex = ++indexCopy % 4;
    let possibleOperation = directions[possibleDirIndex];

    [x1, y1] = getPos(x, y, possibleOperation);
    if (zoneParcourue.has(x + "|" + y) && zoneParcourue.has(x1 + "|" + y1)) {
      if (y === y1) {
        for (const coin of coinParcouru) {
          let yCoin = Number(coin.split("|")[1]);
          let xCoin = Number(coin.split("|")[0]);
          if (yCoin == y) {
            [obsX, obsY] = getPos(x, y, operation);
            if (possibleOperation[0] === "-" && xCoin < x)
              newObstacles.add(obsX + " | " + obsY);
            if (possibleOperation[0] === "+" && xCoin > x)
              newObstacles.add(obsX + " | " + obsY);
          }
        }
      } else if (x === x1) {
        for (const coin of coinParcouru) {
          let xCoin = Number(coin.split("|")[0]);
          let yCoin = Number(coin.split("|")[1]);
          if (xCoin === x) {
            [obsX, obsY] = getPos(x, y, operation);
            if (possibleOperation[1] === "+" && yCoin > y)
              newObstacles.add(obsX + " | " + obsY);
            if (possibleOperation[1] === "-" && yCoin < y)
              newObstacles.add(obsX + " | " + obsY);
          }
        }
      }
    }
  }

  return [[x, y], dirIndex];

  function getPos(x, y, operation) {
    if (operation[0] === "+") x++;
    else if (operation[0] === "-") x--;

    if (operation[1] === "+") y++;
    else if (operation[1] === "-") y--;
    return [x, y];
  }
}

let matrix = buildMatrix(input);

let dir = 0;
let currentPosition = getGuardPosition(matrix);
let visited = new Set();
let coins = new Set();
let possibleObstacles = new Set();

while (currentPosition !== undefined) {
  let res = getNextPosition(
    matrix,
    currentPosition,
    dir,
    visited,
    coins,
    possibleObstacles
  );
  currentPosition = res?.[0];
  dir = res?.[1];
  if (currentPosition === undefined) break;
}

console.log(visited);
console.log(coins);
console.log(possibleObstacles);
