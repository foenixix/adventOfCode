import {
  weights as visitToScore,
  startPos as start,
  endPos as end,
  toVisit,
  Direction,
  turnLeft,
} from "./16a";

function prevPos(x: number, y: number, dir: Direction): [number, number] {
  if (dir === "left") {
    return [x + 1, y];
  } else if (dir === "down") {
    return [x, y - 1];
  } else if (dir === "right") {
    return [x - 1, y];
  } else if (dir === "up") {
    return [x, y + 1];
  } else {
    throw new Error("Illegal state: bad dir parsing");
  }
}

const visited = new Set<string>();

function visitBack(x: number, y: number, dir: Direction, score: number) {
  const pos = toVisit(x, y, dir);
  visited.add(pos);

  if (x === start[0] && y === start[1]) {
    return;
  }
  const [straightX, straightY] = prevPos(x, y, dir);
  const straightScore = visitToScore[toVisit(straightX, straightY, dir)];
  if (straightScore === score - 1) {
    visitBack(straightX, straightY, dir, score - 1);
  }

  const left = turnLeft(dir);
  const leftScore = visitToScore[toVisit(x, y, left)];
  if (leftScore === score - 1000) {
    visitBack(x, y, left, score - 1000);
  }

  const right = turnLeft(turnLeft(left));
  const rightScore = visitToScore[toVisit(x, y, right)];
  if (rightScore === score - 1000) {
    visitBack(x, y, right, score - 1000);
  }
}

const upScore = visitToScore[toVisit(end[0], end[1], "up")];
const rightScore = visitToScore[toVisit(end[0], end[1], "right")];
const downScore = visitToScore[toVisit(end[0], end[1], "down")];
const leftScore = visitToScore[toVisit(end[0], end[1], "left")];
const score = Math.min(
  upScore ?? Number.MAX_SAFE_INTEGER,
  rightScore ?? Number.MAX_SAFE_INTEGER,
  downScore ?? Number.MAX_SAFE_INTEGER,
  leftScore ?? Number.MAX_SAFE_INTEGER,
);

if (upScore === score) {
  visitBack(end[0], end[1], "up", score);
}
if (rightScore === score) {
  visitBack(end[0], end[1], "right", score);
}
if (downScore === score) {
  visitBack(end[0], end[1], "down", score);
}
if (leftScore === score) {
  visitBack(end[0], end[1], "left", score);
}

const visitedPositions = new Set<string>();
visited.forEach((visit) => {
  const index = visit.lastIndexOf(",");
  visitedPositions.add(visit.substring(0, index));
});

console.log(visitedPositions.size);
