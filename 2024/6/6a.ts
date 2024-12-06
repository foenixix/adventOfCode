import INPUTS from "./6.json";

type Direction = "up" | "right" | "down" | "left";

const GUARD_UP = "^";
const GUARD_RIGHT = ">";
const GUARD_DOWN = "v";
const GUARD_LEFT = "<";
const OBSTACLE = "#";

const map = INPUTS.value;

let dir: Direction;
let y = map.findIndex(
  (row) =>
    row.includes(GUARD_UP) ||
    row.includes(GUARD_RIGHT) ||
    row.includes(GUARD_DOWN) ||
    row.includes(GUARD_LEFT),
);
let x = map[y].indexOf(GUARD_UP);
if (x >= 0) {
  dir = "up";
} else {
  x = map[y].indexOf(GUARD_RIGHT);
  if (x >= 0) {
    dir = "right";
  } else {
    x = map[y].indexOf(GUARD_DOWN);
    if (x >= 0) {
      dir = "down";
    } else {
      x = map[y].indexOf(GUARD_LEFT);
      if (x >= 0) {
        dir = "left";
      } else {
        throw new Error("Illegal stateNo starting dir found");
      }
    }
  }
}

const visitedPlaces = new Set<string>();

while (true) {
  visitedPlaces.add(`${x},${y}`);
  if (dir === "up") {
    if (y === 0) {
      break;
    }
    if (map[y - 1][x] === OBSTACLE) {
      dir = "right";
    } else {
      y -= 1;
    }
  } else if (dir === "right") {
    if (x === map[0].length - 1) {
      break;
    }
    if (map[y][x + 1] === OBSTACLE) {
      dir = "down";
    } else {
      x += 1;
    }
  } else if (dir === "down") {
    if (y === map.length - 1) {
      break;
    }
    if (map[y + 1][x] === OBSTACLE) {
      dir = "left";
    } else {
      y += 1;
    }
  } else if (dir === "left") {
    if (x === 0) {
      break;
    }
    if (map[y][x - 1] === OBSTACLE) {
      dir = "up";
    } else {
      x -= 1;
    }
  }
}

export const visited = visitedPlaces;
console.log(visitedPlaces.size);
