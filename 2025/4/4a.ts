import INPUTS from "./4_test.json";

const lines = INPUTS.data;

let result = 0;
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[0].length; x++) {
    if (lines[y][x] === ".") {
      continue;
    }
    const adjacentCoordinates: [number, number][] = [
      [x - 1, y + 1],
      [x - 1, y],
      [x - 1, y - 1],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x + 1, y],
      [x + 1, y - 1],
    ];
    if (
      adjacentCoordinates
        .map((coord) => lines[coord[1]]?.[coord[0]] === "@")
        .filter((value) => Boolean(value)).length < 4
    ) {
      console.log(`found removable at (${x},${y})`);
      result++;
    }
  }
}

console.log("result", result);
