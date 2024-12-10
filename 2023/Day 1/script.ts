
import { log } from "console";
import * as fs from "fs";

declare global {
  interface String {
    replaceLast(toReplace: string, replacement: string): string;
  }
}

String.prototype.replaceLast = function (toReplace: string, replacement: string) {
  let pos = this.lastIndexOf(toReplace);
  if (pos === -1) {
    return this;
  }
  return this.substring(0, pos) + replacement + this.substring(pos + toReplace.length);
}



const findFirstAndLast = (line: string): { first: string, last: string } => {
  let sortedIndexes: { index: number, num: string }[] = [];

  const indexOne: number = line.indexOf("one");
  if (indexOne !== -1) sortedIndexes.push({ index: indexOne, num: "1" });
  const indexOneLast: number = line.lastIndexOf("one");
  if (indexOneLast !== -1) sortedIndexes.push({ index: indexOneLast, num: "1" });

  const indexTwo: number = line.indexOf("two");
  if (indexTwo !== -1) sortedIndexes.push({ index: indexTwo, num: "2" });
  const indexTwoLast: number = line.lastIndexOf("two");
  if (indexTwoLast !== -1) sortedIndexes.push({ index: indexTwoLast, num: "2" });


  const indexThree: number = line.indexOf("three");
  if (indexThree !== -1) sortedIndexes.push({ index: indexThree, num: "3" });
  const indexThreeLast: number = line.lastIndexOf("three");
  if (indexThreeLast !== -1) sortedIndexes.push({ index: indexThreeLast, num: "3" });

  const indexFour: number = line.indexOf("four");
  if (indexFour !== -1) sortedIndexes.push({ index: indexFour, num: "4" });
  const indexFourLast: number = line.lastIndexOf("four");
  if (indexFourLast !== -1) sortedIndexes.push({ index: indexFourLast, num: "4" });

  const indexFive: number = line.indexOf("five");
  if (indexFive !== -1) sortedIndexes.push({ index: indexFive, num: "5" });
  const indexFiveLast: number = line.lastIndexOf("five");
  if (indexFiveLast !== -1) sortedIndexes.push({ index: indexFiveLast, num: "5" });

  const indexSix: number = line.indexOf("six");
  if (indexSix !== -1) sortedIndexes.push({ index: indexSix, num: "6" });
  const indexSixLast: number = line.lastIndexOf("six");
  if (indexSixLast !== -1) sortedIndexes.push({ index: indexSixLast, num: "6" });

  const indexSeven: number = line.indexOf("seven");
  if (indexSeven !== -1) sortedIndexes.push({ index: indexSeven, num: "7" });
  const indexSevenLast: number = line.lastIndexOf("seven");
  if (indexSevenLast !== -1) sortedIndexes.push({ index: indexSevenLast, num: "7" });

  const indexEight: number = line.indexOf("eight");
  if (indexEight !== -1) sortedIndexes.push({ index: indexEight, num: "8" });
  const indexEightLast: number = line.lastIndexOf("eight");
  if (indexEightLast !== -1) sortedIndexes.push({ index: indexEightLast, num: "8" });

  const indexNine: number = line.indexOf("nine");
  if (indexNine !== -1) sortedIndexes.push({ index: indexNine, num: "9" });
  const indexNineLast: number = line.lastIndexOf("nine");
  if (indexNineLast !== -1) sortedIndexes.push({ index: indexNineLast, num: "9" });

  const index1: number = line.indexOf("1");
  if (index1 !== -1) sortedIndexes.push({ index: index1, num: "1" });
  const index1Last: number = line.lastIndexOf("1");
  if (index1Last !== -1) sortedIndexes.push({ index: index1Last, num: "1" });

  const index2: number = line.indexOf("2");
  if (index2 !== -1) sortedIndexes.push({ index: index2, num: "2" });
  const index2Last: number = line.lastIndexOf("2");
  if (index2Last !== -1) sortedIndexes.push({ index: index2Last, num: "2" });

  const index3: number = line.indexOf("3");
  if (index3 !== -1) sortedIndexes.push({ index: index3, num: "3" });
  const index3Last: number = line.lastIndexOf("3");
  if (index3Last !== -1) sortedIndexes.push({ index: index3Last, num: "3" });

  const index4: number = line.indexOf("4");
  if (index4 !== -1) sortedIndexes.push({ index: index4, num: "4" });
  const index4Last: number = line.lastIndexOf("4");
  if (index4Last !== -1) sortedIndexes.push({ index: index4Last, num: "4" });

  const index5: number = line.indexOf("5");
  if (index5 !== -1) sortedIndexes.push({ index: index5, num: "5" });
  const index5Last: number = line.lastIndexOf("5");
  if (index5Last !== -1) sortedIndexes.push({ index: index5Last, num: "5" });

  const index6: number = line.indexOf("6");
  if (index6 !== -1) sortedIndexes.push({ index: index6, num: "6" });
  const index6Last: number = line.lastIndexOf("6");
  if (index6Last !== -1) sortedIndexes.push({ index: index6Last, num: "6" });

  const index7: number = line.indexOf("7");
  if (index7 !== -1) sortedIndexes.push({ index: index7, num: "7" });
  const index7Last: number = line.lastIndexOf("7");
  if (index7Last !== -1) sortedIndexes.push({ index: index7Last, num: "7" });

  const index8: number = line.indexOf("8");
  if (index8 !== -1) sortedIndexes.push({ index: index8, num: "8" });
  const index8Last: number = line.lastIndexOf("8");
  if (index8Last !== -1) sortedIndexes.push({ index: index8Last, num: "8" });

  const index9: number = line.indexOf("9");
  if (index9 !== -1) sortedIndexes.push({ index: index9, num: "9" });
  const index9Last: number = line.lastIndexOf("9");
  if (index9Last !== -1) sortedIndexes.push({ index: index9Last, num: "9" });

  console.log("SortedIndexes Before", sortedIndexes);
  sortedIndexes.sort((a, b) => a.index - b.index);
  // console.log("SortedIndexes After", sortedIndexes);

  // replace the first and last string
  if (sortedIndexes.length === 0) {
    return { first: "0", last: "0" };
  }
  const first = sortedIndexes[0].num;
  const last = sortedIndexes[sortedIndexes.length - 1].num;
  return { first, last };
};

const data = fs.readFileSync("./fghj.txt", "utf8");

let somme = 0;
data.split("\n").forEach((line) => {
  const { first, last } = findFirstAndLast(line);

  somme += parseInt(`${first}${last}`)

});
console.log(somme);