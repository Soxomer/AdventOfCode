const fs = require("fs")
const input = fs.readFileSync("input.txt","utf-8")

let numbers = input.split('\r\n').map(v=>{
    return v.split(" ");
}).map(v=>{
    let parsed = v[0].slice(0,-1)
    v.shift()
    return [parsed,...v]
})
numbers = numbers.map(n=>n.map(Number))

function generatePermutations(length) {
  if (length === 0) return [""]; // Base case : une chaîne vide
  const smallerPermutations = generatePermutations(length - 1); // Permutations de taille réduite
  const permutations = [];

  // Ajoute '0' et '1' à chaque permutation plus petite
  smallerPermutations.forEach((permutation) => {
    permutations.push(permutation+"+");
    permutations.push(permutation+"*");
  });

  return permutations;
}

function calculate(numbers,permutations) {
    let [res,...nums] = numbers
    console.log(nums);
    return permutations.some(perm=>{
        let permRes = nums.reduce((a,b,i)=> {
            if (perm[i-1]==="+") return a+b
            else return a*b
        })
        if (permRes === res) return true
    })
}


let tot=0
for (let i = 0; i < numbers.length; i++) {        
    let permutations = generatePermutations(numbers[i].length-2)
    
    let isValid = calculate(numbers[i],permutations)
    if (isValid) tot+=numbers[i][0]
}
console.log(tot);
