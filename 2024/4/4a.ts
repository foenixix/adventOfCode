import INPUTS from "./4.json";

const word = "XMAS";
const matrix = INPUTS.value;
const width = matrix[0].length;
const height = matrix.length;

function leftWord(x: number, y: number) {
  return wordDir((i) => matrix[y]?.[x - i]);
}
function rightWord(x: number, y: number) {
  return wordDir((i) => matrix[y]?.[x + i]);
}
function downWord(x: number, y: number) {
  return wordDir((i) => matrix[y + i]?.[x]);
}
function upWord(x: number, y: number) {
  return wordDir((i) => matrix[y - i]?.[x]);
}
function leftUpWord(x: number, y: number) {
  return wordDir((i) => matrix[y - i]?.[x - i]);
}
function rightUpWord(x: number, y: number) {
  return wordDir((i) => matrix[y - i]?.[x + i]);
}
function rightDownWord(x: number, y: number) {
  return wordDir((i) => matrix[y + i]?.[x + i]);
}
function leftDownWord(x: number, y: number) {
  return wordDir((i) => matrix[y + i]?.[x - i]);
}

function wordDir(letterFinder: (i: number) => string) {
  for (let i = 1; i < word.length; i++) {
    if (letterFinder(i) !== word[i]) {
      return false;
    }
  }
  return true;
}

let result = 0;
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (matrix[y][x] !== word[0]) {
      continue;
    }
    result += [
      leftWord(x, y),
      rightWord(x, y),
      downWord(x, y),
      upWord(x, y),
      leftUpWord(x, y),
      rightUpWord(x, y),
      rightDownWord(x, y),
      leftDownWord(x, y),
    ]
      .map((bool) => (bool ? 1 : 0))
      .reduce<number>((acc, val) => acc + val, 0);
  }
}
console.log(result);
