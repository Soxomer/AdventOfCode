"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
String.prototype.replaceLast = function (toReplace, replacement) {
    var pos = this.lastIndexOf(toReplace);
    if (pos === -1) {
        return this;
    }
    return this.substring(0, pos) + replacement + this.substring(pos + toReplace.length);
};
var findFirstAndLast = function (line) {
    var sortedIndexes = [];
    var indexOne = line.indexOf("one");
    if (indexOne !== -1)
        sortedIndexes.push({ index: indexOne, num: "1" });
    var indexOneLast = line.lastIndexOf("one");
    if (indexOneLast !== -1)
        sortedIndexes.push({ index: indexOneLast, num: "1" });
    var indexTwo = line.indexOf("two");
    if (indexTwo !== -1)
        sortedIndexes.push({ index: indexTwo, num: "2" });
    var indexTwoLast = line.lastIndexOf("two");
    if (indexTwoLast !== -1)
        sortedIndexes.push({ index: indexTwoLast, num: "2" });
    var indexThree = line.indexOf("three");
    if (indexThree !== -1)
        sortedIndexes.push({ index: indexThree, num: "3" });
    var indexThreeLast = line.lastIndexOf("three");
    if (indexThreeLast !== -1)
        sortedIndexes.push({ index: indexThreeLast, num: "3" });
    var indexFour = line.indexOf("four");
    if (indexFour !== -1)
        sortedIndexes.push({ index: indexFour, num: "4" });
    var indexFourLast = line.lastIndexOf("four");
    if (indexFourLast !== -1)
        sortedIndexes.push({ index: indexFourLast, num: "4" });
    var indexFive = line.indexOf("five");
    if (indexFive !== -1)
        sortedIndexes.push({ index: indexFive, num: "5" });
    var indexFiveLast = line.lastIndexOf("five");
    if (indexFiveLast !== -1)
        sortedIndexes.push({ index: indexFiveLast, num: "5" });
    var indexSix = line.indexOf("six");
    if (indexSix !== -1)
        sortedIndexes.push({ index: indexSix, num: "6" });
    var indexSixLast = line.lastIndexOf("six");
    if (indexSixLast !== -1)
        sortedIndexes.push({ index: indexSixLast, num: "6" });
    var indexSeven = line.indexOf("seven");
    if (indexSeven !== -1)
        sortedIndexes.push({ index: indexSeven, num: "7" });
    var indexSevenLast = line.lastIndexOf("seven");
    if (indexSevenLast !== -1)
        sortedIndexes.push({ index: indexSevenLast, num: "7" });
    var indexEight = line.indexOf("eight");
    if (indexEight !== -1)
        sortedIndexes.push({ index: indexEight, num: "8" });
    var indexEightLast = line.lastIndexOf("eight");
    if (indexEightLast !== -1)
        sortedIndexes.push({ index: indexEightLast, num: "8" });
    var indexNine = line.indexOf("nine");
    if (indexNine !== -1)
        sortedIndexes.push({ index: indexNine, num: "9" });
    var indexNineLast = line.lastIndexOf("nine");
    if (indexNineLast !== -1)
        sortedIndexes.push({ index: indexNineLast, num: "9" });
    var index1 = line.indexOf("1");
    if (index1 !== -1)
        sortedIndexes.push({ index: index1, num: "1" });
    var index1Last = line.lastIndexOf("1");
    if (index1Last !== -1)
        sortedIndexes.push({ index: index1Last, num: "1" });
    var index2 = line.indexOf("2");
    if (index2 !== -1)
        sortedIndexes.push({ index: index2, num: "2" });
    var index2Last = line.lastIndexOf("2");
    if (index2Last !== -1)
        sortedIndexes.push({ index: index2Last, num: "2" });
    var index3 = line.indexOf("3");
    if (index3 !== -1)
        sortedIndexes.push({ index: index3, num: "3" });
    var index3Last = line.lastIndexOf("3");
    if (index3Last !== -1)
        sortedIndexes.push({ index: index3Last, num: "3" });
    var index4 = line.indexOf("4");
    if (index4 !== -1)
        sortedIndexes.push({ index: index4, num: "4" });
    var index4Last = line.lastIndexOf("4");
    if (index4Last !== -1)
        sortedIndexes.push({ index: index4Last, num: "4" });
    var index5 = line.indexOf("5");
    if (index5 !== -1)
        sortedIndexes.push({ index: index5, num: "5" });
    var index5Last = line.lastIndexOf("5");
    if (index5Last !== -1)
        sortedIndexes.push({ index: index5Last, num: "5" });
    var index6 = line.indexOf("6");
    if (index6 !== -1)
        sortedIndexes.push({ index: index6, num: "6" });
    var index6Last = line.lastIndexOf("6");
    if (index6Last !== -1)
        sortedIndexes.push({ index: index6Last, num: "6" });
    var index7 = line.indexOf("7");
    if (index7 !== -1)
        sortedIndexes.push({ index: index7, num: "7" });
    var index7Last = line.lastIndexOf("7");
    if (index7Last !== -1)
        sortedIndexes.push({ index: index7Last, num: "7" });
    var index8 = line.indexOf("8");
    if (index8 !== -1)
        sortedIndexes.push({ index: index8, num: "8" });
    var index8Last = line.lastIndexOf("8");
    if (index8Last !== -1)
        sortedIndexes.push({ index: index8Last, num: "8" });
    var index9 = line.indexOf("9");
    if (index9 !== -1)
        sortedIndexes.push({ index: index9, num: "9" });
    var index9Last = line.lastIndexOf("9");
    if (index9Last !== -1)
        sortedIndexes.push({ index: index9Last, num: "9" });
    console.log("SortedIndexes Before", sortedIndexes);
    sortedIndexes.sort(function (a, b) { return a.index - b.index; });
    // console.log("SortedIndexes After", sortedIndexes);
    // replace the first and last string
    if (sortedIndexes.length === 0) {
        return { first: "0", last: "0" };
    }
    var first = sortedIndexes[0].num;
    var last = sortedIndexes[sortedIndexes.length - 1].num;
    return { first: first, last: last };
};
var data = fs.readFileSync("./fghj.txt", "utf8");
var somme = 0;
data.split("\n").forEach(function (line) {
    var _a = findFirstAndLast(line), first = _a.first, last = _a.last;
    somme += parseInt("".concat(first).concat(last));
});
console.log(somme);
