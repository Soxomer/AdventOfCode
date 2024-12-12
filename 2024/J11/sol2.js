const fs = require('fs')
const input = fs.readFileSync("input.txt", "utf-8").split(/\s+/).map(Number);
let cache = new Map();

function splitIn2(number) {
  let stringToSplit = number.toString();
  let half = stringToSplit.length / 2;
  let sub1 = stringToSplit.slice(0, half);
  let sub2 = stringToSplit.slice(half, stringToSplit.length);

  while (sub2.startsWith("0") && sub2.length > 1) {
    sub2 = sub2.replace("0", "");
  }
  return [Number(sub1), Number(sub2)];
}

function solution(stone, rep) {
  let cacheKey = `${stone}|${rep}`;
  if (rep === 0) return 1;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  let ret = 0;
  if (stone === 0) ret = solution(1, rep - 1);
  else if (stone.toString().length % 2 !== 0)
    ret = solution(stone * 2024, rep - 1);
  else {
    let [sub1, sub2] = splitIn2(stone);
    ret = solution(sub1, rep - 1) + solution(sub2, rep - 1);
  }
  cache.set(cacheKey, ret);
  return ret;
}

let sum = 0;
for (let i = 0; i < input.length; i++) {
  sum += solution(input[i], 75);
  console.log(cache);
}

console.log(sum);
