const fs = require("fs");

let input = fs.readFileSync("input.txt", "utf8").split(/\r\n/);
let reports = input.map(report => report.split(" ").map(Number));

function isValidReport(lvls, haveSecondChance = true) {
  const checkMode = lvls[1] > lvls[0] ? "asc" : "desc";
  for (let i = 1; i < lvls.length; i++) {
    let current = lvls[i];
    let previous = lvls[i - 1];
    if (!isOrdered(previous, current, checkMode) || !isInRange(current, previous, 1, 3)) {
      return haveSecondChance ? isValidReportWithDampener(lvls, i) : false;
    }
  }
  return true;
}

function isValidReportWithDampener(lvls, currentIndex) {
 return lvls.some((_,i) => {
    if (isValidReport(lvls.toSpliced(i,1),false)) return true
 });
}

function isInRange(lvl1, lvl2, min, max) {
  const dif = Math.abs(lvl1 - lvl2);
  return dif >= min && dif <= max;
}

function isOrdered(first, second, order) {
  if (order === "asc") return first < second;
  if (order === "desc") return first > second;
}

let safeReports = reports.reduce((count, report) => count + (isValidReport(report) ? 1 : 0), 0);

console.log(safeReports);
console.log(isValidReport([2 ,4 ,3 ,1, 0], true));
