import INPUTS from "./15.json";

const { map, moves } = INPUTS.value;

const width = map[0].length;
const height = map.length;

const walls = new Set<string>();
const boxes = new Set<string>();
let pos: [number, number] = [0, 0];

function toPos(x: number, y: number) {
  return `${x},${y}`;
}

for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const elem = map[y][x];
    if (elem === "#") {
      walls.add(toPos(x, y));
    } else if (elem === "O") {
      boxes.add(toPos(x, y));
    } else if (elem === "@") {
      pos = [x, y];
    }
  }
}

function isWall(x: number, y: number) {
  return (
    x < 1 ||
    x >= width - 1 ||
    y < 1 ||
    y >= height - 1 ||
    walls.has(toPos(x, y))
  );
}

function isBox(x: number, y: number) {
  return boxes.has(toPos(x, y));
}

function push(x: number, y: number, dir: [number, number]): boolean {
  if (isWall(x, y)) {
    return false;
  } else if (isBox(x, y)) {
    const newX = x + dir[0];
    const newY = y + dir[1];
    if (push(newX, newY, dir)) {
      boxes.delete(toPos(x, y));
      boxes.add(toPos(newX, newY));
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function moveRobot(dir: [number, number]) {
  const newX = pos[0] + dir[0];
  const newY = pos[1] + dir[1];
  if (isWall(newX, newY)) {
    return;
  } else if (isBox(newX, newY)) {
    if (push(newX, newY, dir)) {
      pos = [newX, newY];
    }
  } else {
    pos = [newX, newY];
  }
}

for (const move of moves) {
  if (move === "<") {
    moveRobot([-1, 0]);
  } else if (move === "^") {
    moveRobot([0, -1]);
  } else if (move === ">") {
    moveRobot([1, 0]);
  } else if (move === "v") {
    moveRobot([0, 1]);
  } else {
    throw new Error("Illegal state, bad move parsing");
  }
}

const result = [...boxes]
  .map((box) => {
    const [x, y] = box.split(",");
    return parseInt(y) * 100 + parseInt(x);
  })
  .reduce((acc, value) => acc + value, 0);

console.log(result);
