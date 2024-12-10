const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

const mulRegex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
const digitsRegex = /\d+/g;

const filteredInput = input.matchAll(mulRegex);

let sum = 0;
let isAddMode = true;

for (const mul of filteredInput) {
  [d1, d2] = mul[0].matchAll(digitsRegex).map((v) => Number(v[0]));
  console.log(d1, d2);

  if (d1 == undefined && mul[0] == "don't()") isAddMode = false;
  if (d1 == undefined && mul[0] == "do()") {
    isAddMode = true;
    continue;
  }

  if (isAddMode) sum += d1 * d2;
}

console.log(sum);
// tout les mul non preceder pas des don't eux meme pas succeder par des
