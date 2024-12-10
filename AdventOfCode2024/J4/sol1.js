const fs = require("fs");

let input = fs.readFileSync("input.txt", "utF-8");
const wordToFind = "XMAS";

function createMatrix(input) {
  let matrix = [];
  const lines = input.split(/\r\n/);
  for (let i = 0; i < lines.length; i++) {
    matrix[i] = lines[i].split("");
  }
  return matrix;
}

let combinaisons = [
// diagonal
    ["-", "-"],
    ["+", "-"],
    ["-", "+"],
    ["+", "+"],

// vertical
    [".","+"],
    [".","-"],

// horizontal
    ["+","."],
    ["-","."]
  ]

function getNextLetterPosition(pos, operation) {
  let [x, y] = pos;
  if (operation[0] === "+") x += 1;
  else if(operation[0] ==="-") x -= 1;

  if (operation[1] === "+") y += 1;
  else if(operation[1] ==="-")y -= 1;

  return [x, y];
}

function checkWord(matrix, firstLetterPos, word) {
  let occ = 0;
  for (const operation of combinaisons) {
    let letterPos=firstLetterPos
    let wordFound = true;
    
    for (let i = 1; i < word.split("").length; i++) {
      letterPos = getNextLetterPosition(letterPos, operation);
      const nextLetter = word[i];
      
      // out of bounds
      if (
        letterPos[0] < 0 ||
        letterPos[1] < 0 ||
        matrix[letterPos[0]]?.[letterPos[1]] === undefined
      ) {
        wordFound = false;
        break;
      }

    
      if (matrix[letterPos[0]][letterPos[1]] !== nextLetter) {
        wordFound = false;
        break;
      }
    }
    if (wordFound) occ++;
  }
  return occ
}

const matrix = createMatrix(input);
let occ = 0
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {    
    if (matrix[i][j] === wordToFind[0]) {
        console.log(matrix[i][j],i,j);
        occ += checkWord(matrix, [i, j], wordToFind)
    }
  }
}

console.log(occ);