const fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8").split(/\r\n/);

function isSafeReport(report) {
    const lvls = report.split(" ").map(Number);
  return checkRules(lvls);
}

function checkRules(lvls) {
  const checkMode = lvls[1] > lvls[0] ? "asc" : "desc";
  for (let i = 1; i < lvls.length; i++) {
    current = lvls[i];
    previous = lvls[i - 1];
    if (
      !isOrdered(previous, current, checkMode) ||
      !isInRange(current, previous, 1, 3)
    )
      return false;
  }
  return true;
}

function isInRange(lvl1, lvl2, min, max) {
  const dif = Math.abs(lvl1 - lvl2);
  return dif >= min && dif <= max;
}

function isOrdered(first, second, order) {
  if (order == "asc") return first < second;
  if (order == "desc") return first > second;
}

let safeReports = 0;

input.forEach((report) => {
  if (isSafeReport(report)) {
    safeReports++;
  }
});

console.log(safeReports);