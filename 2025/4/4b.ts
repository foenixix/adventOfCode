import INPUTS from "./4.json";

const lines = INPUTS.data;

let result = 0;
let changed: boolean;
do {
  changed = false;
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
        lines[y] = lines[y].substring(0, x) + "." + lines[y].substring(x + 1);
        changed = true;
        result++;
      }
    }
  }
} while (changed == true);

console.log("result", result);
