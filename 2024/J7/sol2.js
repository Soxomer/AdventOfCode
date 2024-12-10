const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");

let numbers = input
  .split("\r\n")
  .map((v) => {
    return v.split(" ");
  })
  .map((v) => {
    let parsed = v[0].slice(0, -1);
    v.shift();
    return [parsed, ...v];
  });
numbers = numbers.map((n) => n.map(Number));

function generatePermutations(length) {
  let permutations = [""];

  for (let i = 0; i < length; i++) {
    const newPermutations = [];
    permutations.forEach((permutation) => {
      newPermutations.push(permutation + "+");
      newPermutations.push(permutation + "*");
      newPermutations.push(permutation + "|");
    });
    permutations = newPermutations;
  }

  return permutations;
}

function calculate(numbers, permutations) {
  let [res, ...nums] = numbers;
  return permutations.some((perm) => {
    let permRes = nums.reduce((a, b, i) => {
      if (perm[i - 1] === "+") return a + b;
      else if (perm[i-1]==="*") return a * b;
      else return Number(String(a)+String(b))
    });
    if (permRes === res) return true;
  });
}

let tot = 0;
for (let i = 0; i < numbers.length; i++) {
  let permutations = generatePermutations(numbers[i].length - 2);

  let isValid = calculate(numbers[i], permutations);
  if (isValid) tot += numbers[i][0];
}
console.log(tot);
