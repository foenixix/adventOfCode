import INPUTS from "./16.json";

const map = INPUTS.test.map;

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

function toVisit(x: number, y: number, dir: Direction) {
  return x + "," + y + "," + dir;
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

let lowestScore = Number.MAX_SAFE_INTEGER;
const visitList: [[number, number], Direction, number][] = [
  [start, "right", 0],
];
const visitToScore: Record<string, number> = {
  [toVisit(start[0], start[1], "right")]: 0,
};

while (visitList.length > 0 && visitList[0][2] < lowestScore) {
  const [[[x, y], dir, score]] = visitList.splice(0, 1);
  visit(x, y, dir, score);
}

function insertNextVisitIfWorth(
  x: number,
  y: number,
  dir: Direction,
  newScore: number,
) {
  if (map[y][x] === "#") {
    return;
  }
  const visit = toVisit(x, y, dir);

  const score = visitToScore[visit];
  if (score !== undefined) {
    if (score < newScore) {
      return;
    }
    const indexToRemove = visitList.findIndex(
      ([pos]) => pos[0] === x && pos[1] === y,
    );
    visitList.splice(indexToRemove, 0);
  }
  const addIndex = visitList.findIndex(
    ([_pos, _dir, score]) => score > newScore,
  );
  const entry: [[number, number], Direction, number] = [[x, y], dir, newScore];
  if (addIndex < 0) {
    visitList.push(entry);
  } else if (addIndex === 0) {
    visitList.splice(0, 0, entry);
  } else {
    visitList.splice(addIndex - 1, 0, entry);
  }
  visitToScore[visit] = newScore;
}

function visit(x: number, y: number, dir: Direction, score: number) {
  if (x === end[0] && y === end[1]) {
    if (score < lowestScore) {
      lowestScore = score;
    }
    return;
  }
  const [straightX, straightY] = nextPos(x, y, dir);
  const straightScore = score + 1;
  insertNextVisitIfWorth(straightX, straightY, dir, straightScore);

  const turnedScore = score + 1000;

  const left = turnLeft(dir);
  const [leftX, leftY] = nextPos(x, y, left);
  if (map[leftY][leftX] !== "#") {
    insertNextVisitIfWorth(x, y, left, turnedScore);
  }

  const right = turnLeft(turnLeft(left));
  const [rightX, rightY] = nextPos(x, y, right);
  if (map[rightY][rightX] !== "#") {
    insertNextVisitIfWorth(x, y, right, turnedScore);
  }
}

console.log(JSON.stringify(visitToScore, null, 2));
console.log(lowestScore);
