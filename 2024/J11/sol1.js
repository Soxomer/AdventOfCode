const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split(/\s+/);

function replaceWithOne(liste, index) {
  liste.splice(index, 1, "1");
}

function multiplyBy2024(liste, index) {
  liste.splice(index, 1, (Number(liste[index]) * 2024).toString());
}

function splitIn2(liste, index) {
  let numberToSplit = liste[index];

  let half = Math.floor(numberToSplit.length / 2);
  let sub1 = numberToSplit.slice(0, half);
  let sub2 = numberToSplit.slice(half, numberToSplit.length);

  while (sub2.startsWith("0") && sub2.length > 1) {
    sub2 = sub2.replace("0", "");
  }
  liste.splice(index, 1, sub1, sub2);
}

function solution(repetitions) {
  for (let rep = 0; rep < repetitions; rep++) {
    for (let i = 0; i < input.length; i++) {
      let number = input[i];
      if (number === "0") replaceWithOne(input, i);
      else if (number.length % 2 === 0) {
        splitIn2(input, i);
        i++;
      } else multiplyBy2024(input, i);
    }
  }
}

solution(25);


