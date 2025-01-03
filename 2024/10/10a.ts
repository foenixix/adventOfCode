import INPUTS from "./10.json";

const map = INPUTS.value;

function getScore(x: number, y: number): number {
  return visit(x, y, visitedEnds);
}

function visit(x: number, y: number, visitedEnds: Set<string>): number {
  const value = parseInt(map[y][x]);
  const pos = `${x},${y}`;
  if (value === 9) {
    if (visitedEnds.has(pos)) {
      return 0;
    } else {
      visitedEnds.add(pos);
      return 1;
    }
  }
  let result = 0;
  if (x > 0 && parseInt(map[y][x - 1]) === value + 1) {
    result += visit(x - 1, y, visitedEnds);
  }
  if (x < map[0].length - 1 && parseInt(map[y][x + 1]) === value + 1) {
    result += visit(x + 1, y, visitedEnds);
  }
  if (y > 0 && parseInt(map[y - 1][x]) === value + 1) {
    result += visit(x, y - 1, visitedEnds);
  }
  if (y < map.length - 1 && parseInt(map[y + 1][x]) === value + 1) {
    result += visit(x, y + 1, visitedEnds);
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
