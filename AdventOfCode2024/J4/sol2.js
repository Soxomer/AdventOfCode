const fs = require("fs");

let input = fs.readFileSync("i.txt", "utF-8");

function createMatrix(input) {
  let matrix = [];
  const lines = input.split(/\r\n/);
  for (let i = 0; i < lines.length; i++) {
    matrix[i] = lines[i].split("");
  }
  return matrix;
}

function checkWord(matrix, firstLetterPos) {
  let [x,y] = firstLetterPos

  let topLeft = matrix[x - 1]?.[y - 1];
  let topRight = matrix[x + 1]?.[y - 1];
  let bottomLeft = matrix[x - 1]?.[y + 1];
  let bottomRight = matrix[x + 1]?.[y + 1];

  if (topLeft===undefined || topRight===undefined||bottomLeft===undefined||bottomRight===undefined) return false
  if (topLeft==="S" && bottomRight!=="M" || !(topRight==="S"|| topRight==="M")) return false
  if (topLeft === "M" && bottomRight !== "S" || !(topRight === "S" || topRight === "M"))return false;
  if (topRight === "S" && bottomLeft !== "M" || !(topLeft === "S" || topLeft === "M"))return false;
  if (topRight === "M" && bottomLeft !== "S" || !(topLeft === "S" ||topLeft === "M"))return false;

  return true
}

const matrix = createMatrix(input);
let occ = 0
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {    
    if (matrix[i][j] === "A") {
        if(checkWord(matrix, [i, j]))occ++
    }
  }
}

console.log(occ);