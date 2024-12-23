import INPUTS from "./20.json";
import { writeFileSync } from "fs";

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

const cheatsPos = new Set<string>();
const cheatsFound: Record<number, number> = {};

function lookForCheat(x: number, y: number, currentSteps: number) {
  const nextCandidates: [number, number][] = [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
  ];
  for (const candidate of nextCandidates) {
    if (
      candidate[0] < 1 ||
      candidate[1] < 1 ||
      candidate[0] >= width - 1 ||
      candidate[1] >= height - 1 ||
      map[candidate[1]][candidate[0]] === "#"
    ) {
      continue;
    }
    const candidatePos = toPos(candidate[0], candidate[1]);
    const originalSteps = originalRoute.indexOf(candidatePos);
    if (originalSteps < 0) {
      throw new Error(
        "Illegal State, original should have passed here: " + candidatePos,
      );
    }
    if (originalSteps > currentSteps + 1) {
      cheatsPos.add(toPos(x, y));
      const savedSteps = originalSteps - currentSteps - 1;
      if (!cheatsFound[savedSteps]) {
        cheatsFound[savedSteps] = 0;
      }
      cheatsFound[savedSteps]++;
    }
  }
}

originalRoute.forEach((pos, i) => {
  const [stringX, stringY] = pos.split(",");
  const x = parseInt(stringX);
  const y = parseInt(stringY);

  const nextCandidates: [number, number][] = [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
  ];
  for (const candidate of nextCandidates) {
    if (
      candidate[0] < 1 ||
      candidate[1] < 1 ||
      candidate[0] >= width - 1 ||
      candidate[1] >= height - 1
    ) {
      continue;
    }
    if (map[candidate[1]][candidate[0]] === "#") {
      lookForCheat(candidate[0], candidate[1], i + 1);
    }
  }
});

const totalCheats = Object.entries(cheatsFound)
  .filter(([key]) => parseInt(key) >= 100)
  .map(([key, value]) => value)
  .reduce((acc, value) => acc + value, 0);
console.log(totalCheats);
console.log("check", cheatsPos.size);
console.log(cheatsFound);
console.log(
  Object.entries(cheatsFound).filter(([key]) => parseInt(key) >= 100),
);
debugger;
