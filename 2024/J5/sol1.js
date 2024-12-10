const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8");
const [rules, lines] = input.split(/\n\s*\n/).map((c) => c.split("\r\n"));

const mapRules = new Map(); //{key,{before:Set,after:Set}}
rules.forEach((rule) => {
  const [before, after] = rule.split("|").map(Number);
  let mapRulesBefore = mapRules.get(before);
  let setAfter = mapRulesBefore?.after || new Set();
  setAfter.add(after);
  mapRules.set(before, {
    before: mapRules.get(before)?.before,
    after: setAfter,
  });

  let mapRulesAfter = mapRules.get(after);
  let setBefore = mapRulesAfter?.before || new Set();
  setBefore.add(before);
  mapRules.set(after, { before: setBefore, after: mapRules.get(after)?.after });
});
console.log(lines);

function isValidPage(numbers) {
  for (let current = 0; current < numbers.length; current++) {
    const numberRules = mapRules.get(numbers[current]);

    let beforeSub = numbers.slice(0, current);
    let afterSub = numbers.slice(current + 1, numbers.length);

    if (numberRules?.before) {
      for (const r of numberRules.before) {
        if (afterSub.includes(r)) return false;
      }
    }

    if (numberRules?.after) {
      for (const r of numberRules.after) {
        if (beforeSub.includes(r)) return false;
      }
    }
  }

  return true;
}

let tot = 0;
lines.forEach((line) => {
  const page = line.split(",").map(Number);

  let isValid = isValidPage(page);
  if (isValid) {
      let middle =Math.floor(page.length / 2)
      console.log(page,page[middle]);
    tot += page[middle];
  }
});

console.log(tot);

