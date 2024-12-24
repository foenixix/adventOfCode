import INPUTS from "./20.json";

const map = INPUTS.value;
const width = map[0].length;
const height = map.length;

let start: [number, number] = [0, 0];
let end: [number, number] = [0, 0];

map.forEach((row, y) => {
  const startIndex = row.indexOf("S");
  if (startIndex >= 0) {
    start = [startIndex, y];
  }

  const endIndex = row.indexOf("E");
  if (endIndex >= 0) {
    end = [endIndex, y];
  }
});

function toPos(x: number, y: number): string {
  return x + "," + y;
}

const originalRoute: string[] = [];
let startX = start[0];
let startY = start[1];
while (startX !== end[0] || startY !== end[1]) {
  originalRoute.push(toPos(startX, startY));
  const nextCandidates: [number, number][] = [
    [startX, startY + 1],
    [startX, startY - 1],
    [startX + 1, startY],
    [startX - 1, startY],
  ];
  for (const candidate of nextCandidates) {
    if (
      candidate[0] < 1 ||
      candidate[1] < 1 ||
      candidate[0] >= width - 1 ||
      candidate[1] >= height - 1 ||
      map[candidate[1]][candidate[0]] === "#" ||
      originalRoute.at(-2) === toPos(candidate[0], candidate[1])
    ) {
      continue;
    }
    startX = candidate[0];
    startY = candidate[1];
  }
}
originalRoute.push(toPos(end[0], end[1]));

console.log("route length", originalRoute.length);

const cheatsFound: Record<number, number> = {};

function lookForCheat(pathX: number, pathY: number, pathSteps: number) {
  const localCheatsFound: Record<number, number> = {};
  let currentSteps = pathSteps;
  let currentVisits: [number, number][] = [[pathX, pathY]];
  let nextVisits = new Set<string>();
  const visitedSet = new Set<string>();
  function step() {
    for (const [x, y] of currentVisits) {
      const pos = toPos(x, y);
      visitedSet.add(pos);
      if (map[y][x] !== "#") {
        const originalSteps = originalRoute.indexOf(pos);
        if (originalSteps < 0) {
          throw new Error(
            "Illegal State, original should have passed here: " + pos,
          );
        }
        if (originalSteps > currentSteps) {
          const savedSteps = originalSteps - currentSteps;
          if (!localCheatsFound[savedSteps]) {
            localCheatsFound[savedSteps] = 0;
          }
          localCheatsFound[savedSteps]++;
        }
      }

      const nextCandidates: [number, number][] = [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y],
      ];
      for (const candidate of nextCandidates) {
        const candidatePos = toPos(candidate[0], candidate[1]);
        if (
          candidate[0] < 1 ||
          candidate[1] < 1 ||
          candidate[0] >= width - 1 ||
          candidate[1] >= height - 1 ||
          visitedSet.has(candidatePos)
        ) {
          continue;
        }
        nextVisits.add(candidatePos);
      }
    }
  }

  while (
    currentSteps < originalRoute.length &&
    currentSteps < pathSteps + 21 &&
    currentVisits.length > 0
  ) {
    step();
    currentSteps++;
    currentVisits = [...nextVisits].map((pos) => {
      const [stringX, stringY] = pos.split(",");
      return [parseInt(stringX), parseInt(stringY)];
    });
    nextVisits.clear();
  }

  Object.entries(localCheatsFound).forEach(([keyString, value]) => {
    const key = parseInt(keyString);
    if (!cheatsFound[key]) {
      cheatsFound[key] = 0;
    }
    cheatsFound[key] += value;
  });
}

originalRoute.forEach((pos, i) => {
  const [stringX, stringY] = pos.split(",");
  const x = parseInt(stringX);
  const y = parseInt(stringY);
  console.log(i);
  lookForCheat(x, y, i);
});

const totalCheats = Object.entries(cheatsFound)
  .filter(([key]) => parseInt(key) >= 100)
  .map(([key, value]) => value)
  .reduce((acc, value) => acc + value, 0);
console.log("result", totalCheats);
console.log(cheatsFound);
