import INPUTS from "./4.json";

const word = "XMAS";
const matrix = INPUTS.value;
const width = matrix[0].length;
const height = matrix.length;

function word1(x: number, y: number) {
  const leftUp = matrix[y - 1]?.[x - 1];
  const rightDown = matrix[y + 1]?.[x + 1];
  return (
    (leftUp === "M" && rightDown === "S") ||
    (leftUp === "S" && rightDown === "M")
  );
}

function word2(x: number, y: number) {
  const leftDown = matrix[y + 1]?.[x - 1];
  const rightUp = matrix[y - 1]?.[x + 1];
  return (
    (leftDown === "M" && rightUp === "S") ||
    (leftDown === "S" && rightUp === "M")
  );
}

let result = 0;
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (matrix[y][x] !== "A") {
      continue;
    }
    result += word1(x, y) && word2(x, y) ? 1 : 0;
  }
}
console.log(result);
