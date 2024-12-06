import INPUTS from "./6.json";
import { visited } from "./6a";

type Direction = "up" | "right" | "down" | "left";

const GUARD_UP = "^";
const GUARD_RIGHT = ">";
const GUARD_DOWN = "v";
const GUARD_LEFT = "<";
const OBSTACLE = "#";

const startMap = INPUTS.value;

let startDir: Direction;
let startY = startMap.findIndex(
  (row) =>
    row.includes(GUARD_UP) ||
    row.includes(GUARD_RIGHT) ||
    row.includes(GUARD_DOWN) ||
    row.includes(GUARD_LEFT),
);
let startX = startMap[startY].indexOf(GUARD_UP);
if (startX >= 0) {
  startDir = "up";
} else {
  startX = startMap[startY].indexOf(GUARD_RIGHT);
  if (startX >= 0) {
    startDir = "right";
  } else {
    startX = startMap[startY].indexOf(GUARD_DOWN);
    if (startX >= 0) {
      startDir = "down";
    } else {
      startX = startMap[startY].indexOf(GUARD_LEFT);
      if (startX >= 0) {
        startDir = "left";
      } else {
        throw new Error("Illegal stateNo starting dir found");
      }
    }
  }
}

function isLoop(map: string[], x: number, y: number, dir: Direction) {
  const visitedPlaces = new Set<string>();

  while (true) {
    const posEntry = `(${x},${y},${dir})`;
    if (visitedPlaces.has(posEntry)) {
      return true;
    }
    visitedPlaces.add(posEntry);
    if (dir === "up") {
      if (y === 0) {
        return false;
      }
      if (map[y - 1][x] === OBSTACLE) {
        dir = "right";
      } else {
        y -= 1;
      }
    } else if (dir === "right") {
      if (x === map[0].length - 1) {
        return false;
      }
      if (map[y][x + 1] === OBSTACLE) {
        dir = "down";
      } else {
        x += 1;
      }
    } else if (dir === "down") {
      if (y === map.length - 1) {
        return false;
      }
      if (map[y + 1][x] === OBSTACLE) {
        dir = "left";
      } else {
        y += 1;
      }
    } else if (dir === "left") {
      if (x === 0) {
        return false;
      }
      if (map[y][x - 1] === OBSTACLE) {
        dir = "up";
      } else {
        x -= 1;
      }
    }
  }
}

const startMapString = JSON.stringify(startMap);
let count = 0;
for (const pos of visited) {
  const obstX = parseInt(pos.split(",")[0]);
  const obstY = parseInt(pos.split(",")[1]);
  if (obstX === startX && obstY === startY) {
    continue;
  }
  const map = JSON.parse(startMapString);
  map[obstY] =
    map[obstY].substring(0, obstX) + "#" + map[obstY].substring(obstX + 1);
  if (isLoop(map, startX, startY, startDir)) {
    count++;
  }
}

console.log(count);
