import INPUTS from "./18.json";

const { size, obstacles, length } = INPUTS.value;

const obstacleSet = new Set<string>();
const visitedSet = new Set<string>();

function toPos(x: number, y: number) {
  return x + "," + y;
}

for (let i = 0; i < length; i++) {
  obstacleSet.add(toPos(obstacles[i][0], obstacles[i][1]));
}

let steps = 0;
let currentPositions: [number, number][] = [[0, 0]];
let nextPositions = new Set<string>();

function step(): boolean {
  for (const [x, y] of currentPositions) {
    if (x === size - 1 && y === size - 1) {
      return true;
    }
    visitedSet.add(toPos(x, y));

    const nextCandidates = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ];
    for (const candidate of nextCandidates) {
      if (
        candidate[0] < 0 ||
        candidate[1] < 0 ||
        candidate[0] >= size ||
        candidate[1] >= size
      ) {
        continue;
      }
      const pos = toPos(candidate[0], candidate[1]);
      if (!visitedSet.has(pos) && !obstacleSet.has(pos)) {
        nextPositions.add(pos);
      }
    }
  }
  return false;
}

while (true) {
  if (step()) {
    break;
  } else {
    steps++;
    currentPositions = [...nextPositions].map((string) => {
      const [x, y] = string.split(",");
      return [parseInt(x), parseInt(y)];
    });
    nextPositions.clear();
  }
}

console.log(steps);
