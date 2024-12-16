import INPUTS from "./10.json";

const map = INPUTS.value;

function getScore(x: number, y: number): number {
  const value = parseInt(map[y][x]);
  if (value === 9) {
    return 1;
  }
  let result = 0;
  if (x > 0 && parseInt(map[y][x - 1]) === value + 1) {
    result += getScore(x - 1, y);
  }
  if (x < map[0].length - 1 && parseInt(map[y][x + 1]) === value + 1) {
    result += getScore(x + 1, y);
  }
  if (y > 0 && parseInt(map[y - 1][x]) === value + 1) {
    result += getScore(x, y - 1);
  }
  if (y < map.length - 1 && parseInt(map[y + 1][x]) === value + 1) {
    result += getScore(x, y + 1);
  }
  return result;
}

let result = 0;
map.forEach((row, y) => {
  let index = row.indexOf("0");
  while (index >= 0) {
    result += getScore(index, y);
    index = row.indexOf("0", index + 1);
  }
});

console.log(result);

console.log("done");
