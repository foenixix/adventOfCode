import INPUTS from "./16.json";

const { map, weights: visitToScore } = INPUTS.test;

type Direction = "right" | "up" | "left" | "down";

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

const score = visitToScore[toVisit()];
let shortestPath: string[] = [];
const visited = new Set<string>();
let currentScore = 0;

function toVisit(x: number, y: number, dir: Direction) {
  return x + "," + y + "," + dir;
}

function toPos(x: number, y: number) {
  return x + "," + y;
}

function turnLeft(dir: Direction): Direction {
  if (dir === "left") {
    return "down";
  } else if (dir === "down") {
    return "right";
  } else if (dir === "right") {
    return "up";
  } else if (dir === "up") {
    return "left";
  } else {
    throw new Error("Illegal state: bad dir parsing");
  }
}

function nextPos(x: number, y: number, dir: Direction): [number, number] {
  if (dir === "left") {
    return [x - 1, y];
  } else if (dir === "down") {
    return [x, y + 1];
  } else if (dir === "right") {
    return [x + 1, y];
  } else if (dir === "up") {
    return [x, y - 1];
  } else {
    throw new Error("Illegal state: bad dir parsing");
  }
}

function canVisit(x: number, y: number) {
  return !visited.has(toPos(x, y)) && map[y][x] !== "#";
}

function visit(x: number, y: number, dir: Direction, path: string[]) {
  const pos = toPos(x, y);
  visited.add(pos);
  const nextPath = [...path, pos];

  if (x === end[0] && y === end[1]) {
    if (currentScore < lowestScore) {
      lowestScore = currentScore;
      shortestPath = nextPath;
    }
    return;
  }
  const [straightX, straightY] = nextPos(x, y, dir);
  if (canVisit(straightX, straightY)) {
    currentScore++;
    visit(straightX, straightY, dir, nextPath);
    visited.delete(toPos(straightX, straightY));
    currentScore--;
  }

  const left = turnLeft(dir);
  const [leftX, leftY] = nextPos(x, y, left);
  if (canVisit(leftX, leftY)) {
    currentScore += 1001;
    visit(leftX, leftY, left, nextPath);
    visited.delete(toPos(leftX, leftY));
    currentScore -= 1001;
  }

  const right = turnLeft(turnLeft(left));
  const [rightX, rightY] = nextPos(x, y, right);
  if (canVisit(rightX, rightY)) {
    currentScore += 1001;
    visit(rightX, rightY, right, nextPath);
    visited.delete(toPos(rightX, rightY));
    currentScore -= 1001;
  }
}

visit(start[0], start[1], "right", []);

console.log(lowestScore);
console.log(shortestPath);
