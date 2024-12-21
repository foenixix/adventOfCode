import INPUTS from "./18.json";

const { size, obstacles, length } = INPUTS.test;

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
    if (x === length - 1 && y === length - 1) {
      return true;
    }
    visitedSet.add(toPos(x, y));

    const nextCandidates = [
      [x - 1, y + 1],
      [x - 1, y - 1],
      [x + 1, y + 1],
      [x + 1, y - 1],
    ];
    for (const candidate of nextCandidates) {
      const pos = toPos(candidate[0], candidate[1]);
      if (!visitedSet.has(pos)) {
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
