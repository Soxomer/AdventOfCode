const fs = require("fs")
let input = fs.readFileSync("input.txt","utf-8")

let directions = [["-","."],[".","+"],["+","."],[".","-"]] // up,right,down,left

function buildMatrix(text) {
    let lines = text.split(/\r\n/)
    let cells = lines.map(v=>v.split(""))
    return cells
}

function getGuardPosition(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] === "^") return [i,j]
        }
    }
}

function getNextPosition(matrix,currentPosition,dirIndex) {
    let [x,y] = currentPosition
    let operation = directions[dirIndex]
    
    if (operation[0]==="+") x++
    else if (operation[0]==="-") x--

    if (operation[1]==="+") y++
    else if (operation[1]==="-") y--
    
    if (matrix[x]?.[y] === undefined) return undefined
    
    // if collision 
    else if (matrix[x]?.[y] === "#") {
            dirIndex = ++dirIndex % 4            
            operation = directions[dirIndex];
            [x,y] = currentPosition
            if (operation[0] === "+") x++;
            else if (operation[0] === "-") x--;

            if (operation[1] === "+") y++;
            else if (operation[1] === "-") y--;

            if (matrix[x][y] === undefined) return undefined;
    }
    return [[x,y],dirIndex]
}

let matrix = buildMatrix(input)

let dir= 0
let currentPosition = getGuardPosition(matrix)
let visited = new Set()
while (currentPosition !== undefined) {
    visited.add(currentPosition[0]+"|"+currentPosition[1])
    let res = getNextPosition(matrix,currentPosition,dir)
    currentPosition = res?.[0]
    dir=res?.[1]
    if (currentPosition === undefined) break
}

console.log(visited);

